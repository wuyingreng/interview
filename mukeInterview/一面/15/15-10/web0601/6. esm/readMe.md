# 脚本说明

## package.json 中的脚本作用

1. **build**
   ```bash
   npm run build
   ```
   作用：使用 Babel 将 `./js/src` 目录下的 ES6+ 源码编译为兼容性的 JavaScript，输出到 `./dist/bundle` 目录下。

2. **browserify**
   ```bash
   npm run browserify
   ```
   作用：使用 Browserify 将 `./dist/bundle.js` 及其依赖打包成一个浏览器可直接使用的 `./dist/bundle2.js` 文件，解决模块化代码在浏览器端的兼容问题。

3. **build:all**
   ```bash
   npm run build:all
   ```
   作用：依次执行 `build` 和 `browserify` 两个脚本，先编译再打包，一步完成所有构建流程。

---

## 如何查看效果

1. 执行构建命令：
   ```bash
   npm run build:all
   ```
   这会在 `./dist/` 目录下生成 `bundle2.js`。

2. 在项目中的 `index.html` 文件中，通过 `<script src="./dist/bundle2.js"></script>` 引入打包后的文件。

3. 用浏览器打开 `index.html`，即可查看最终效果。

如需调试或查看源码编译前后的区别，可分别查看 `./js/src`（源码）、`./dist/bundle`（Babel 编译后）、`./dist/bundle2.js`（最终打包结果）。 