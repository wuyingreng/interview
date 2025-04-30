#  目录结构

xss-demo/
│
├── attacker-server.js
├── victim-server.js
│
└── public/
    └── index.html

# 如何运行
1. 安装依赖
在项目根目录执行
npm init -y
npm install express cors body-parser
2. 在这个目录下启动攻击者服务器
node attacker-server.js
运行在 http://localhost:3000
3. 在这个目录下启动受害者网站服务器

node victim-server.js
# 运行在 http://localhost:4000
在浏览器中访问 http://localhost:4000