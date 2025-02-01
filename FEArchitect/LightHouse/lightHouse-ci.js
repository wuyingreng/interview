import fs from 'fs'
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info', output: 'html', onlyCategories: ['performance'], port:
      //启动一个 Chrome
      chrome.port
  };
  //使用 Lighthouse 对目标页面进行跑分
  const runnerResult = await lighthouse('https://example.com', options);

  //'.report'是一个 HTML 类型的分析页面
  const reportHtml = runnerResult.report; fs.writeFileSync('lhreport.html', reportHtml);

  //'.lhr'是用于 1ighthous-ci 方案的结果集合
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score100);
  await chrome.kill()
})()