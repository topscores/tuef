import iconv from 'iconv-lite'

export const lpad = (val, length, padStr = ' ') => {
  let result = val.toString()
  while (result.length < length) {
    result = `${padStr}${result}`
  }
  return result
}

export const rpad = (val, length, padStr = ' ') => {
  let result = val.toString()
  while (result.length < length) {
    result = `${result}${padStr}`
  }
  return result
}

export const truncate = (val, length) => {
  let result = val.toString()
  if (result.length > length) {
    result = result.substr(0, length)
  }
  return result
}

export const isValidDate = date => {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return false
  }
  return !isNaN(date.getTime())
}

export const yyyymmdd = date => {
  // If date is a Date object
  if (isValidDate(date)) {
    const yyyy = date.getFullYear().toString()
    const mm = (date.getMonth() + 1).toString() // getMonth() is zero-based
    const dd = date.getDate().toString()
    return yyyy + (mm[1] ? mm : `0${mm[0]}`) + (dd[1] ? dd : `0${dd[0]}`) // zero pad
  }
  // If date is not a Date object
  const type = Object.prototype.toString.call(date)
  throw new TypeError(`yyyymmdd expects input of type Date, but get ${type}`)
}

export const isValueAvailable = val => {
  return val !== undefined && val !== null
}
export const isArray = val => {
  return typeof val !== 'undefined' && val.constructor === Array
}
// Convert utf8 string to latin1 encoding with win874 charset
export const toWin874 = str => {
  const win874 = iconv.encode(str, 'win874')
  return win874
}
