async function run(runOptions) {
  // 检查相关数据
  const results = {};
  // 使用 Puppeteer 创建一个无头浏览器
  const context = await this.createPuppeteer(runOptions);
  try {
    // 执行必要的登录流程
    await this.Login(context);
    // 页面打开前的钩子函数
    await this.before(context)
    // 打开页面，获取数据
    await this.getlighthouseResult(context),
      // 页面打开后的钩子函数
      await this.after(context, results);
    // 收集页面性能数据
    return await this.collectArtifact(context, results);
  } catch (error) {
    throw error;
  } finally {
    // 关闭页面和无头浏览器
    await this.disposeDriver(context)
  }
}