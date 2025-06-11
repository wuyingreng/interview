//
//  ContentView.swift
//  Shared
//
//  Created by xpf on 2025/6/11.
//

import SwiftUI
import WebKit
import AVFoundation
import CoreLocation

class WebViewCoordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler, UIImagePickerControllerDelegate, UINavigationControllerDelegate, CLLocationManagerDelegate {
    var parent: WebView
    var imagePicker: UIImagePickerController?
    var webView: WKWebView?
    var locationManager: CLLocationManager?
    
    init(_ parent: WebView) {
        self.parent = parent
        super.init()
        setupLocationManager()
    }
    
    private func setupLocationManager() {
        locationManager = CLLocationManager()
        locationManager?.delegate = self
        locationManager?.desiredAccuracy = kCLLocationAccuracyBest
    }
    
    // 处理 URL Scheme 方式
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
    
    private func handleJSBridge(url: URL) {
        guard let methodName = url.host else { return }
        
        if let queryItems = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems {
            for item in queryItems {
                if item.name == "params" {
                    if let paramsString = item.value,
                       let paramsData = paramsString.data(using: .utf8) {
                        do {
                            if let params = try JSONSerialization.jsonObject(with: paramsData) as? [String: Any] {
                                print("URL Scheme 方法名: \(methodName)")
                                print("URL Scheme 参数: \(params)")
                                
                                switch methodName {
                                case "methodName":
                                    if let id = params["id"] as? Int {
                                        print("收到 ID: \(id)")
                                    }
                                case "getLocation":
                                    requestLocation()
                                default:
                                    print("未知的 URL Scheme 方法名: \(methodName)")
                                }
                            }
                        } catch {
                            print("URL Scheme 参数解析错误: \(error)")
                        }
                    }
                }
            }
        }
    }
    
    // 处理 API 注入方式
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
        case "nativeBridge":
            if let body = message.body as? [String: Any],
               let method = body["method"] as? String {
                switch method {
                case "openCamera":
                    openCamera()
                case "getLocation":
                    requestLocation()
                default:
                    print("未知的 API 方法: \(method)")
                }
            }
        default:
            break
        }
    }
    
    // 请求位置权限并获取位置
    private func requestLocation() {
        locationManager?.requestWhenInUseAuthorization()
        locationManager?.requestLocation()
    }
    
    // CLLocationManagerDelegate 方法
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.first {
            let locationData: [String: Any] = [
                "latitude": location.coordinate.latitude,
                "longitude": location.coordinate.longitude,
                "accuracy": location.horizontalAccuracy
            ]
            
            if let jsonData = try? JSONSerialization.data(withJSONObject: locationData),
               let jsonString = String(data: jsonData, encoding: .utf8) {
                // 调用 JS 回调函数
                callJSFunction("onLocationUpdate", params: jsonString)
            }
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        callJSFunction("onLocationError", params: error.localizedDescription)
    }
    
    // 调用 JS 函数的通用方法
    private func callJSFunction(_ functionName: String, params: String) {
        let js = "window.\(functionName)(\(params))"
        webView?.evaluateJavaScript(js) { result, error in
            if let error = error {
                print("调用 JS 函数错误: \(error)")
            }
        }
    }
    
    private func openCamera() {
        AVCaptureDevice.requestAccess(for: .video) { [weak self] granted in
            DispatchQueue.main.async {
                if granted {
                    self?.showCamera()
                } else {
                    self?.sendMessageToJS("相机权限被拒绝")
                }
            }
        }
    }
    
    private func showCamera() {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = self
        self.imagePicker = picker
        
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
           let rootViewController = windowScene.windows.first?.rootViewController {
            rootViewController.present(picker, animated: true)
        }
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        picker.dismiss(animated: true)
        
        if let image = info[.originalImage] as? UIImage {
            if let imageData = image.jpegData(compressionQuality: 0.8) {
                let base64String = imageData.base64EncodedString()
                sendMessageToJS("data:image/jpeg;base64," + base64String)
            }
        }
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true)
        sendMessageToJS("用户取消了拍照")
    }
    
    private func sendMessageToJS(_ message: String) {
        let js = "window.onCameraResult('\(message)')"
        webView?.evaluateJavaScript(js, completionHandler: nil)
    }
}

struct WebView: UIViewRepresentable {
    let url: URL
    
    func makeCoordinator() -> WebViewCoordinator {
        WebViewCoordinator(self)
    }
    
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        
        // 注册消息处理器（API 注入方式）
        userContentController.add(context.coordinator, name: "nativeBridge")
        
        // 注入 JavaScript 接口（API 注入方式）
        let js = """
        window.nativeBridge = {
            openCamera: function() {
                window.webkit.messageHandlers.nativeBridge.postMessage({
                    method: 'openCamera'
                });
            },
            getLocation: function() {
                window.webkit.messageHandlers.nativeBridge.postMessage({
                    method: 'getLocation'
                });
            }
        };
        
        // 位置更新回调函数
        window.onLocationUpdate = function(location) {
            console.log('位置更新:', location);
            // 这里处理位置数据
            // location 包含 latitude, longitude, accuracy
        };
        
        // 位置错误回调函数
        window.onLocationError = function(error) {
            console.error('位置错误:', error);
        };
        """
        let script = WKUserScript(source: js, injectionTime: .atDocumentEnd, forMainFrameOnly: false)
        userContentController.addUserScript(script)
        
        configuration.userContentController = userContentController
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        context.coordinator.webView = webView
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        let request = URLRequest(url: url)
        webView.load(request)
    }
}

struct ContentView: View {
    var body: some View {
        WebView(url: URL(string: "https://www.apple.com")!)
            .edgesIgnoringSafeArea(.all)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
