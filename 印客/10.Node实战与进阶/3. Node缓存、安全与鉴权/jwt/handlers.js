const jwt = require('jsonwebtoken');

const jwtKey = 'chenghuai_secret_key';
const jwtExpirySeconds = 300; // 单位为s

const users = {
	user1: 'password1',
	user2: 'password2',
};

const signIn = (req, res) => {
	const { username, password } = req.body;
	if (!username || !password || users[username] !== password) {
		return res.status(401).end();
	}

	// 创建JWT，并将username置于payload，过期时间为300s
	const token = jwt.sign({ username }, jwtKey, {
		algorithm: 'HS256',
		expiresIn: jwtExpirySeconds,
	});
	console.log('token:', token);

	// 设置cookie，存储token至本地，且有效期保持一致
	res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
	res.end();
};

const welcome = (req, res) => {
	// 从请求中的cookie中获取token
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).end();
	}

	var payload;

	try {
		payload = jwt.verify(token, jwtKey);
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end();
		}
		// 否则，返回400 bad request
		return res.status(400).end();
	}

	res.send(`Welcome ${payload.username}!`);
};

const refresh = (req, res) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).end();
	}

	var payload;
	try {
		payload = jwt.verify(token, jwtKey);
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end();
		}
		return res.status(400).end();
	}

	// 当且仅当有效期在30s内，重新生成token，否则，返回400，不重新创建token
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
	if (payload.exp - nowUnixSeconds > 30) {
		return res.status(400).end();
	}

	// 创建新的jwt token
	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: 'HS256',
		expiresIn: jwtExpirySeconds,
	});

	res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 });
	res.end();
};

module.exports = {
	signIn,
	welcome,
	refresh,
};
