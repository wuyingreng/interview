const userName='Emily';
const age=25
// module.exports={
//     userName,
//     age
// }

exports={
	userName,
	age
}



(function (exports, require, module, __filename, __dirname) {
           const userName='Emily';
			const age=25
			// module.exports={
			//     userName,
			//     age
			// }

			// exports 是module.exports的别名。这里断开了两者之间的联系，而外部访问的一直是module.exports

			exports={
				userName,
				age
			}
        })