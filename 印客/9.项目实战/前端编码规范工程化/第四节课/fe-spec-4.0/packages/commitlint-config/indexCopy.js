module.exports = {
	rules: [
		"''": [2, 'alaways'],
		"subject-no-chinese": [2, 'alaways']
	],
	plugins: {
		rules: {
			"body-no-chinese": function ({ body }) {
				if (!body) return true;

				const chineseRegext = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
				const hasChinese = chineseRegext.test(subject);

				if (hasChinese) {
					return [false, '提交信息必须使用英文，不能包含中文字符。例如：feat: add user login functionality'];
				}

				return [true];
			}
		},
		"subject-no-chinese": function ({ subject }) {
			if (!subject) return [false, '必须包含提交信息'];
			const chineseRegexp=/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
			const hasChinese=chineseRegexp.test(subject);
			if(hasChinese){
				return [false,'主题中不能包含中文']
			}
		}
	}
}