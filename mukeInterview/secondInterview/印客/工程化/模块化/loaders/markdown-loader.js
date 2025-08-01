const { marked } = require('marked')

module.exports = function (content) {
  const ret = marked.parse(content)
  console.log('md', ret)

  return ret
}
