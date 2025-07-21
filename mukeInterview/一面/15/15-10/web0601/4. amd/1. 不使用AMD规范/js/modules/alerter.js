(function (window, dataService) {
	let name = 'chenghuai';
	function showMsg() {
		alert(dataService.getMsg() + ', ' + name);
	}
	window.alerter = { showMsg };
})(window, dataService);
