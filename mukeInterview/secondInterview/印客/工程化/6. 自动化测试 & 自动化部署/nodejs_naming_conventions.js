// Node.js API 命名规范示例

console.log('=== Node.js API 命名规范 ===');

// 1. 全小写 + 下划线的API（占大多数）
console.log('\n--- 全小写 + 下划线风格 ---');
console.log('fs.read_file()');
console.log('fs.write_file()');
console.log('fs.access()');
console.log('path.join()');
console.log('url.parse()');
console.log('querystring.parse()');
console.log('crypto.create_hash()');
console.log('http.create_server()');
console.log('process.next_tick()');

// 2. 驼峰命名的API（少量）
console.log('\n--- 驼峰命名风格 ---');

// 文件系统 (fs)
console.log('fs.readFile()');
console.log('fs.writeFile()');
console.log('fs.readFileSync()');
console.log('fs.writeFileSync()');
console.log('fs.appendFile()');
console.log('fs.copyFile()');
console.log('fs.mkdir()');
console.log('fs.rmdir()');
console.log('fs.readdir()');
console.log('fs.stat()');
console.log('fs.access()');
console.log('fs.chmod()');
console.log('fs.chown()');
console.log('fs.utimes()');
console.log('fs.watch()');
console.log('fs.watchFile()');
console.log('fs.unwatchFile()');
console.log('fs.realpath()');
console.log('fs.symlink()');
console.log('fs.readlink()');
console.log('fs.unlink()');
console.log('fs.rename()');
console.log('fs.truncate()');
console.log('fs.ftruncate()');
console.log('fs.fsync()');
console.log('fs.fdatasync()');

// 路径 (path)
console.log('path.join()');
console.log('path.resolve()');
console.log('path.normalize()');
console.log('path.isAbsolute()');
console.log('path.relative()');
console.log('path.dirname()');
console.log('path.basename()');
console.log('path.extname()');
console.log('path.parse()');
console.log('path.format()');
console.log('path.sep');
console.log('path.delimiter');
console.log('path.posix');
console.log('path.win32');

// URL
console.log('url.parse()');
console.log('url.format()');
console.log('url.resolve()');
console.log('url.resolveObject()');
console.log('url.domainToASCII()');
console.log('url.domainToUnicode()');
console.log('url.fileURLToPath()');
console.log('url.pathToFileURL()');
console.log('url.urlToHttpOptions()');

// 查询字符串
console.log('querystring.parse()');
console.log('querystring.stringify()');
console.log('querystring.escape()');
console.log('querystring.unescape()');

// 加密
console.log('crypto.createHash()');
console.log('crypto.createHmac()');
console.log('crypto.createCipher()');
console.log('crypto.createDecipher()');
console.log('crypto.createSign()');
console.log('crypto.createVerify()');
console.log('crypto.createDiffieHellman()');
console.log('crypto.createECDH()');
console.log('crypto.createCredentials()');
console.log('crypto.randomBytes()');
console.log('crypto.randomFill()');
console.log('crypto.pbkdf2()');
console.log('crypto.scrypt()');
console.log('crypto.timingSafeEqual()');

// HTTP
console.log('http.createServer()');
console.log('http.request()');
console.log('http.get()');
console.log('http.globalAgent');
console.log('http.maxHeaderSize');
console.log('http.STATUS_CODES');

// HTTPS
console.log('https.createServer()');
console.log('https.request()');
console.log('https.get()');
console.log('https.globalAgent');

// 进程
console.log('process.nextTick()');
console.log('process.setUncaughtExceptionCaptureCallback()');
console.log('process.hasUncaughtExceptionCaptureCallback()');
console.log('process.channel');
console.log('process.connected');
console.log('process.disconnect()');
console.log('process.exitCode');
console.log('process.kill()');
console.log('process.pid');
console.log('process.ppid');
console.log('process.title');
console.log('process.arch');
console.log('process.platform');
console.log('process.version');
console.log('process.versions');
console.log('process.config');
console.log('process.execPath');
console.log('process.execArgv');
console.log('process.argv');
console.log('process.env');
console.log('process.cwd()');
console.log('process.chdir()');
console.log('process.umask()');
console.log('process.uptime()');
console.log('process.hrtime()');
console.log('process.hrtime.bigint()');
console.log('process.cpuUsage()');
console.log('process.memoryUsage()');
console.log('process.resourceUsage()');

// 缓冲区
console.log('Buffer.alloc()');
console.log('Buffer.allocUnsafe()');
console.log('Buffer.allocUnsafeSlow()');
console.log('Buffer.from()');
console.log('Buffer.isBuffer()');
console.log('Buffer.isEncoding()');
console.log('Buffer.byteLength()');
console.log('Buffer.concat()');
console.log('Buffer.compare()');

// 事件
console.log('events.EventEmitter');
console.log('events.once()');
console.log('events.on()');
console.log('events.off()');
console.log('events.emit()');
console.log('events.addListener()');
console.log('events.removeListener()');
console.log('events.removeAllListeners()');
console.log('events.setMaxListeners()');
console.log('events.getMaxListeners()');
console.log('events.listenerCount()');
console.log('events.listeners()');
console.log('events.rawListeners()');
console.log('events.prependListener()');
console.log('events.prependOnceListener()');
console.log('events.eventNames()');

// 流
console.log('stream.Readable');
console.log('stream.Writable');
console.log('stream.Duplex');
console.log('stream.Transform');
console.log('stream.PassThrough');
console.log('stream.finished()');
console.log('stream.pipeline()');
console.log('stream.Readable.from()');
console.log('stream.addAbortSignal()');

// 控制台
console.log('console.log()');
console.log('console.info()');
console.log('console.warn()');
console.log('console.error()');
console.log('console.dir()');
console.log('console.time()');
console.log('console.timeEnd()');
console.log('console.timeLog()');
console.log('console.trace()');
console.log('console.assert()');
console.log('console.clear()');
console.log('console.count()');
console.log('console.countReset()');
console.log('console.group()');
console.log('console.groupEnd()');
console.log('console.table()');

// 定时器
console.log('setTimeout()');
console.log('setInterval()');
console.log('setImmediate()');
console.log('clearTimeout()');
console.log('clearInterval()');
console.log('clearImmediate()');

// 全局对象
console.log('globalThis');
console.log('global');
console.log('process');
console.log('Buffer');
console.log('__dirname');
console.log('__filename');
console.log('module');
console.log('require');
console.log('exports');

console.log('\n--- 总结 ---');
console.log('Node.js API 命名规范：');
console.log('1. 大部分API使用全小写 + 下划线风格');
console.log('2. 少量API使用驼峰命名，主要是：');
console.log('   - 文件系统操作 (fs.readFile, fs.writeFile)');
console.log('   - 路径操作 (path.join, path.resolve)');
console.log('   - URL操作 (url.parse, url.format)');
console.log('   - 加密操作 (crypto.createHash)');
console.log('   - HTTP操作 (http.createServer)');
console.log('   - 进程操作 (process.nextTick)');
console.log('   - 缓冲区操作 (Buffer.alloc)');
console.log('   - 事件操作 (events.once)');
console.log('   - 流操作 (stream.Readable)');
console.log('   - 控制台操作 (console.log)');
console.log('   - 定时器操作 (setTimeout)'); 