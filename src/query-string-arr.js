const strictUriEncode = require('strict-uri-encode')
const decodeComponent = require('decode-uri-component')

// code heavily borrowed from https://github.com/sindresorhus/query-string

function parserForArrayFormat() {
  return (key, value, accumulator) => {
    if (accumulator[key] === undefined) {
      accumulator[key] = value
      return
    }

    accumulator[key] = [].concat(accumulator[key], value)
  }
}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value)
  }

  return value
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value)
  }

  return value
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort()
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input))
      .sort((a, b) => Number(a) - Number(b))
      .map(key => input[key])
  }

  return input
}

function parse(input, type) {
  const options = Object.assign({ decode: true, arrayFormat: 'none' })

  const formatter = parserForArrayFormat(options)

  const ret = {}
  if (typeof input !== 'string') {
    if (type !== undefined && type.array) return []
    return ret
  }

  input = input.trim().replace(/^[?#&]/, '')

  if (!input) {
    if (type !== undefined && type.array) return []
    return ret
  }

  const keyOrder = []
  for (const param of input.split('&')) {
    let [key, value] = param.replace(/\+/g, ' ').split('=')

    // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    value = value === undefined ? null : decode(value, options)
    key = decode(key, options)
    if (ret[key] === undefined) {
      keyOrder.push(key)
    }
    formatter(key, value, ret)
  }


  const obj = Object.keys(ret).sort().reduce((result, key) => {
    const value = ret[key]
    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value)
    } else {
      result[key] = value
    }

    return result
  }, Object.create(null))

  if (type !== undefined && type.array) {
    const arr = []
    for (key of keyOrder) {
      arr.push([key, ret[key]])
    }
    return arr
  }

  return obj
}

exports.parse = parse

function encoderForArrayFormat(options) {
  return (key, value) => (value === null ? encode(key, options) : [
    encode(key, options),
    '=',
    encode(value, options),
  ].join(''))
}

function stringifyHelper(arr, isArray, formatter, options, obj) {
  return arr.map((val) => {
    const value = isArray ? val[1] : obj[val]
    const key = isArray ? val[0] : val

    if (value === undefined) {
      return ''
    }

    if (value === null) {
      return encode(key, options)
    }

    if (Array.isArray(value)) {
      const result = []

      for (const value2 of value.slice()) {
        if (value2 !== undefined) {
          result.push(formatter(key, value2))
        }
      }
      return result.join('&')
    }

    return `${encode(key, options)}=${encode(value, options)}`
  }).filter(x => x.length > 0).join('&')
}

exports.stringify = (obj, options) => {
  if (!obj) {
    return ''
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none',
  }, options)

  const formatter = encoderForArrayFormat(options)
  const isArray = Array.isArray(obj)

  if (isArray) return stringifyHelper(obj, isArray, formatter, options)

  const keys = Object.keys(obj)

  if (options.sort !== false) {
    keys.sort(options.sort)
  }
  return stringifyHelper(keys, isArray, formatter, options, obj)
}
