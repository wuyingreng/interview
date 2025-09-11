const path = require('path');
const requireAll = require('require-all');


exports.configs=requireAll({
	dirname:path.resolve(__dirname,'path');
});


exports.rules=requireAll({
	dirname:path.resolve(__dirname,'rules')
})
