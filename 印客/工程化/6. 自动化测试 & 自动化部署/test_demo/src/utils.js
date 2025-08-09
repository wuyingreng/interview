const getBigger = (a, b) => {
  if (a !== 'number' || b !== 'number') {
    return new TypeError('类型错误')
  }
  if (a > b) {
    return a;
  }
  return b;
}

module.exports = getBigger