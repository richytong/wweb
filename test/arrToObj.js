function arrToObj(arr) {
  const obj = {};
  for (each of arr) {
    obj[each[0]] = each[1]
  }
  return obj;
}

module.exports = arrToObj
