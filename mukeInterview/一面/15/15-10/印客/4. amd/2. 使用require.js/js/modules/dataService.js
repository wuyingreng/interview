define(function () {
	let msg = 'www.chenghuai.com';
	function getMsg() {
		return msg.toUpperCase();
	}
	return { getMsg }; // 暴露模块
});
