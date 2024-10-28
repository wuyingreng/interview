const str = 'Hello Word'
const notGreedpReg = /\s\S*?/g
const greedpReg = /\s\S*/g

const notGreedpResult = str.match(notGreedpReg)
console.log('notGreedpResult=>', notGreedpResult)
const greedpResult = str.match(greedpReg)

console.log('greedpResult=>', greedpResult)

/**
 * notGreedpResult=> [ ' ' ]
*  greedpResult=> [ ' Word' ]
*/