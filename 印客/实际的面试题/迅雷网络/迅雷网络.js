/**
 * 
 * 输入两个时间戳startTime、endTime，格式为 “HH:MM"，
 * 计算从startTime到endTime最少要走多少步，步长可以是 1min，5min，15min，30min，45min
 * 比如1min--> 60*1000
 *
 * 
 * */



// 暴力解法
const steps = (startTime, endTime, range) => {
	const startTimeStamp = startTime.getTimeStamp();
	const endTimeStamp = endTime.getTimeStamp();
	const length = startTimeStamp - endTimeStamp;
	let finalSteps = 0;
	const _45steps = Math.floor((length) / 45 * 60 * 1000);
	if (_45steps <= 0) {
		finalSteps = 1;
		return finalSteps;
	} else {
		finalSteps += _45steps;
		const _30steps = Math.floor((length - _45steps * 45 * 60 * 1000) / 30 * 60 * 1000);
		if (_30steps <= 0) {
			finalSteps += 1;
			return finalSteps;
		} else {
			finalSteps += _30steps;
			const _15steps = Math.floor((length - _45steps * 45 * 60 * 1000 - _30steps * 30 * 60 * 1000) / 15 * 60 * 1000);
			if (_15steps <= 0) {
				finalSteps += 1;
				return finalSteps;
			} else {
				finalSteps += _15steps;
				const _10steps = Math.floor((length - _45steps * 45 * 60 * 1000 - _30steps * 30 * 60 * 1000 - _15steps * 15 * 60 * 1000) / 10 * 60 * 1000);
				if (_10steps <= 0) {
					finalSteps += 1;
					return finalSteps;
				} else {
					finalSteps += _10steps;
					const _5steps = Math.floor((length - _45steps * 45 * 60 * 1000 - _30steps * 30 * 60 * 1000 - _15steps * 15 * 60 * 1000 - _10steps * 10 * 60 * 1000) / 5 * 60 * 1000);
					if (_5steps <= 0) {
						finalSteps += 1;
						return finalSteps;
					} else {
						finalSteps += _5steps;
						const _1steps = Math.floor((length - _45steps * 45 * 60 * 1000 - _30steps * 30 * 60 * 1000 - _15steps * 15 * 60 * 1000 - _10steps * 10 * 60 * 1000 - _5steps * 5 * 60 * 1000) / 1 * 60 * 1000);
						if (_1steps <= 0) {
							finalSteps += 1;
							return finalSteps
						} else {
							finalSteps += _1steps;
							return finalSteps
						}
					}

				}

			}
		}
	}
}
// 用递归做
const steps = (startTime, endTime, range) => {
	let finalSteps = 0;
	const startTimeStamp = startTime.getTimeStamp();
	const endTimeStamp = endTime.getTimeStamp();
	const length = startTimeStamp - endTimeStamp;
	const stepRangeArray = [45, 30, 15, 5, 1];
	const calSteps = (length, index) => {
		if (index >= 5) return
		const range = stepRangeArray[index]
		const _steps = Math.floor((length) / range * 60 * 1000);
		if (_steps <= 0) {
			finalSteps += 1;
			return finalSteps
		} else {
			finalSteps += _steps;
			const leftLength = length - _steps * range * 60 * 1000;
			calSteps(leftLength, index + 1)
		}

	};
	calSteps(length, 0)
}
