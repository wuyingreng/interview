import puppeteer, { LaunchOptions, RunOptions } from "puppeteer";

export const createPuppeteer = async (runOptions: RunOptions) => {
  //启动配置项可以参考 [puppeteerlaunchoptions](https://***.github.io/puppeteer-
  // api-zh CN/#?product=Puppeteer&version=v5.3.0&show=api-puppeteerlaunchoptions)
  const launchOptions: LaunchOptions = {
    headless: true,//是否采用无头模式
    defaultViewport: { width: 1440, height: 960 },//指定页面视口的宽和高
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    // Chromium 安装路径
    executablePath: 'XXX'
  };
  // 创建一个浏览器对象
  const browser = await puppeteer.launch(launchOptions);
  const page = (await browser.pages())[0];
  //返回浏览器对象和页面对象
  return { browser, page }
}


