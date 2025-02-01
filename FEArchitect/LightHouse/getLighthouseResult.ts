import lighthouse from 'lighthouse';

export const getLighthouseResult = async (context: Context) => {
  // 获取上下文信息
  const { browser, url } = context;
  // 使用 Lighthouse 进行性能采集
  const { artifacts, lhr } = await lighthouse(url, {
    port: parseInt(new URL(browser.wsEndpoint()).port),
    output: 'json',
    logLevel: 'info',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
    }
  })
}


