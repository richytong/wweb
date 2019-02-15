function arrToObj(arr) {
  const obj = {}
  arr.forEach((each) => {
    obj[each[0]] = each[1]
  })
  return obj
}

module.exports = arrToObj
