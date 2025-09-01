#!/usr/bin/env node

const Generator = require('yeoman-generator');

// 子类继承Generator 这个父类
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // 添加命令行选项
    this.option('skip-install', {
      type: Boolean,
      description: '跳过依赖安装'
    });
  }

  // 下面的
  initializing() {
    // 将来的实例对象，考虑到有些有些平台会没有console.log
    this.log('🚀 欢迎使用团队React脚手架生成器！');
  }

  prompting() {
    return this.prompt([
      {
        // 是输入类型
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称:',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述:',
        default: '一个使用React构建的现代化Web应用'
      },
      {
        type: 'input',
        name: 'author',
        message: '请输入作者名称:',
        default: '你的团队'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: '选择包管理器:',
        choices: ['npm', 'yarn', 'pnpm'],
        default: 'npm'
      },
      {
        type: 'confirm',
        name: 'useTypeScript',
        message: '是否使用TypeScript?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useRouter',
        message: '是否包含React Router?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useStateManagement',
        message: '是否包含状态管理(Redux Toolkit)?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useTesting',
        message: '是否包含测试配置(Jest + Testing Library)?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useLinting',
        message: '是否包含代码规范配置(ESLint + Prettier)?',
        default: true
      }
    ]).then((answers) => {
      // 是个promise，拿到所有用户输出的结果。赋值给类的属性
      this.answers = answers;
    });
  }

  writing() {
    // 复制项目文件
    this._copyProjectFiles();

    // 根据用户选择动态生成文件
    this._generateDynamicFiles();
  }

  _copyProjectFiles() {
    // 复制基础配置文件
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath(`src/index.${this.answers.useTypeScript ? 'tsx' : 'jsx'}`),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('src/App.js'),
      this.destinationPath(`src/App.${this.answers.useTypeScript ? 'tsx' : 'jsx'}`),
      this.answers
    );
  }

  _generateDynamicFiles() {
    // 根据用户选择生成不同的配置文件
    if (this.answers.useTypeScript) {
      this.fs.copyTpl(
        this.templatePath('tsconfig.json'),
        this.destinationPath('tsconfig.json'),
        this.answers
      );
    }

    if (this.answers.useLinting) {
      this.fs.copyTpl(
        this.templatePath('.eslintrc.js'),
        this.destinationPath('.eslintrc.js'),
        this.answers
      );

      this.fs.copyTpl(
        this.templatePath('.prettierrc'),
        this.destinationPath('.prettierrc'),
        this.answers
      );
    }

    if (this.answers.useTesting) {
      this.fs.copyTpl(
        this.templatePath('jest.config.js'),
        this.destinationPath('jest.config.js'),
        this.answers
      );
    }
  }

  install() {
    if (!this.options['skip-install']) {
      this.log('📦 正在安装依赖...');

      if (this.answers.packageManager === 'yarn') {
        this.yarnInstall();
      } else if (this.answers.packageManager === 'pnpm') {
        this.spawnCommandSync('pnpm', ['install']);
      } else {
        this.npmInstall();
      }
    }
  }

  end() {
    this.log('🎉 项目创建完成！');
    this.log('');
    this.log('下一步操作:');
    this.log(`  cd ${this.answers.projectName}`);
    this.log(`  ${this.answers.packageManager} start`);
    this.log('');
    this.log('祝你编码愉快！ 🚀');
  }
}; 