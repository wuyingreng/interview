
const { add, mul } = require('./a');
const { concat } = require('lodash')

const sum = add(10, 20)

const mulAll = mul(10, 20)
console.log('sum==>', sum, mulAll)
console.log('concat==>', concat([1, 2, 3], 4))