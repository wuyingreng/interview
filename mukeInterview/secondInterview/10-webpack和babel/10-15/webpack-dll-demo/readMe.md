这个不用了。用
 cache: {
    type: 'filesystem', // 利用文件系统缓存
    buildDependencies: {
      config: [__filename], // 当配置文件修改时缓存失效
    },
  },