# JS Bridge 实现文档

本文档记录了在 SwiftUI 项目中实现 JS Bridge 的两种方式，以及相关的使用方法和注意事项。

## JS Bridge 基本原理

JS Bridge 的核心原理是基于 `window` 对象进行通信：

1. **window 对象的作用**
   - `window` 是浏览器环境的全局对象
   - 所有全局变量和函数都是 `window` 对象的属性
   - 原生代码可以通过 `window` 对象访问和调用 JS 方法
   - JS 可以通过 `window` 对象访问原生注入的方法

2. **通信机制**
   - JS 调用原生：
     - URL Scheme：通过修改 `window.location.href` 触发原生拦截
     - API 注入：通过 `window.webkit.messageHandlers` 发送消息给原生
   - 原生调用 JS：
     - 通过 `window` 对象直接调用 JS 方法
     - 通过 `evaluateJavaScript` 执行 JS 代码

3. **数据传递**
   - JS 到原生：
     - URL Scheme：通过 URL 参数传递
     - API 注入：通过消息体传递
   - 原生到 JS：
     - 通过 `window` 对象的方法调用传递
     - 通过 `evaluateJavaScript` 执行 JS 代码传递

4. **生命周期**
   - 页面加载时：原生注入 JS 接口
   - 运行时：JS 和原生通过 `window` 对象通信
   - 页面销毁时：清理相关资源

## 目录
- [功能概述](#功能概述)
- [实现方式](#实现方式)
- [使用方法](#使用方法)
- [注意事项](#注意事项)
- [常见问题](#常见问题)

## 功能概述

本项目实现了两种 JS Bridge 方式：
1. URL Scheme 方式
2. API 注入方式

同时实现了以下功能：
- 调用系统相机
- 获取设备位置信息
- 原生调用 JS 方法

## 实现方式

### 1. URL Scheme 方式

#### JS 调用原生
```javascript
// JS 调用方式
window.location.href = 'jsbridge://methodName?params=JSON.stringify({id:100})';
```

#### 原生拦截实现
```swift
// 1. 实现 WKNavigationDelegate 协议
func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    if let url = navigationAction.request.url {
        if url.scheme == "jsbridge" {
            handleJSBridge(url: url)
            decisionHandler(.cancel)
            return
        }
    }
    decisionHandler(.allow)
}

// 2. 解析 URL 并执行对应方法
private func handleJSBridge(url: URL) {
    guard let methodName = url.host else { return }
    
    if let queryItems = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems {
        for item in queryItems {
            if item.name == "params" {
                if let paramsString = item.value,
                   let paramsData = paramsString.data(using: .utf8) {
                    do {
                        if let params = try JSONSerialization.jsonObject(with: paramsData) as? [String: Any] {
                            print("方法名: \(methodName)")
                            print("参数: \(params)")
                            
                            switch methodName {
                            case "methodName":
                                if let id = params["id"] as? Int {
                                    print("收到 ID: \(id)")
                                }
                            default:
                                print("未知的方法名: \(methodName)")
                            }
                        }
                    } catch {
                        print("参数解析错误: \(error)")
                    }
                }
            }
        }
    }
}
```

### 2. API 注入方式

#### JS 调用原生
```javascript
// JS 调用方式
window.nativeBridge.openCamera();
```

#### 原生注入实现
```swift
// 1. 创建 WKWebViewConfiguration
let configuration = WKWebViewConfiguration()
let userContentController = WKUserContentController()

// 2. 注册消息处理器
userContentController.add(self, name: "nativeBridge")

// 3. 注入 JavaScript 接口
let js = """
window.nativeBridge = {
    openCamera: function() {
        window.webkit.messageHandlers.nativeBridge.postMessage({
            method: 'openCamera'
        });
    }
};
"""
let script = WKUserScript(source: js, injectionTime: .atDocumentEnd, forMainFrameOnly: false)
userContentController.addUserScript(script)

// 4. 配置 WebView
configuration.userContentController = userContentController
let webView = WKWebView(frame: .zero, configuration: configuration)

// 5. 实现 WKScriptMessageHandler 协议处理消息
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    switch message.name {
    case "nativeBridge":
        if let body = message.body as? [String: Any],
           let method = body["method"] as? String {
            switch method {
            case "openCamera":
                openCamera()
            default:
                print("未知的方法: \(method)")
            }
        }
    default:
        break
    }
}
```

### 3. 原生调用 JS 方法

#### JS 端实现
```javascript
// 1. 定义回调函数
window.onCameraResult = function(result) {
    if (result.startsWith('data:image')) {
        // 处理图片数据（base64格式）
        const img = document.createElement('img');
        img.src = result;
        document.body.appendChild(img);
    } else {
        // 处理其他结果（如错误信息）
        console.log(result);
    }
};

// 2. 注入回调函数（在页面加载时）
window.nativeBridge = {
    openCamera: function() {
        window.webkit.messageHandlers.nativeBridge.postMessage({
            method: 'openCamera'
        });
    }
};
```

#### 原生调用实现
```swift
// 1. 调用 JS 函数的通用方法
private func callJSFunction(_ functionName: String, params: String) {
    let js = "window.\(functionName)(\(params))"
    webView?.evaluateJavaScript(js) { result, error in
        if let error = error {
            print("调用 JS 函数错误: \(error)")
        }
    }
}

// 2. 在需要的地方调用 JS 方法
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    picker.dismiss(animated: true)
    
    if let image = info[.originalImage] as? UIImage {
        if let imageData = image.jpegData(compressionQuality: 0.8) {
            let base64String = imageData.base64EncodedString()
            // 调用 JS 回调函数
            callJSFunction("onCameraResult", params: "'data:image/jpeg;base64,\(base64String)'")
        }
    }
}
```

## 完整示例

### 1. 调用相机

#### JS 端
```javascript
// 方式一：API 注入
window.nativeBridge.openCamera();

// 方式二：URL Scheme
window.location.href = 'jsbridge://openCamera';

// 接收相机结果
window.onCameraResult = function(result) {
    if (result.startsWith('data:image')) {
        const img = document.createElement('img');
        img.src = result;
        document.body.appendChild(img);
    } else {
        console.log(result);
    }
};
```

#### 原生端
```swift
// 1. 注入 JS 接口
let js = """
window.nativeBridge = {
    openCamera: function() {
        window.webkit.messageHandlers.nativeBridge.postMessage({
            method: 'openCamera'
        });
    }
};
"""

// 2. 处理相机调用
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == "nativeBridge",
       let body = message.body as? [String: Any],
       let method = body["method"] as? String,
       method == "openCamera" {
        openCamera()
    }
}

// 3. 打开相机
private func openCamera() {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] granted in
        DispatchQueue.main.async {
            if granted {
                self?.showCamera()
            } else {
                self?.callJSFunction("onCameraResult", params: "'相机权限被拒绝'")
            }
        }
    }
}

// 4. 处理相机结果
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    picker.dismiss(animated: true)
    
    if let image = info[.originalImage] as? UIImage {
        if let imageData = image.jpegData(compressionQuality: 0.8) {
            let base64String = imageData.base64EncodedString()
            callJSFunction("onCameraResult", params: "'data:image/jpeg;base64,\(base64String)'")
        }
    }
}
```

## 注意事项

1. 权限配置
   - 相机权限：在 Info.plist 中添加 `Privacy - Camera Usage Description`
   - 位置权限：在 Info.plist 中添加 `Privacy - Location When In Use Usage Description`

2. JS 回调函数
   - 需要将回调函数挂载在 `window` 对象上
   - 回调函数应该在页面加载时就定义好
   - 建议使用统一的命名规范，如 `onXXX` 或 `handleXXX`

3. 安全性
   - URL Scheme 方式需要注意 URL 长度限制
   - API 注入方式更安全，推荐使用

## 常见问题

1. JS 回调函数无法调用
   - 检查函数是否挂载在 `window` 对象上
   - 检查函数名是否拼写正确
   - 检查函数是否在页面加载时就定义好

2. 权限问题
   - 确保在 Info.plist 中添加了相应的权限描述
   - 检查用户是否授权
   - 在真机上测试权限相关功能

3. 数据传递
   - 复杂数据建议使用 JSON 格式
   - 注意数据大小限制
   - 考虑使用 base64 编码处理二进制数据

## 扩展建议

1. 添加更多原生功能
   - 文件选择
   - 分享功能
   - 支付功能
   - 推送通知

2. 优化现有功能
   - 添加错误处理
   - 添加加载状态
   - 优化性能

3. 安全性增强
   - 添加方法白名单
   - 添加参数验证
   - 添加超时处理 