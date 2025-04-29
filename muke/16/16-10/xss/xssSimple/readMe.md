1. 要把index.html托管在服务器上的。
2. 执行http-server -p 4007
3. 纯文件系统打开 file:///Users/xiangpeifang/Documents/work/usedaily/pending/technicalnter/16/16-10/xss/xssSimple/index.html
document.cookie = 'bae-verify=1111;';是没有作用的