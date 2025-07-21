(function (window) {
	let msg = 'www.chenghuai.com';
	function getMsg() {
		return msg.toUpperCase();
	}
	window.dataService = { getMsg };
})(window);
