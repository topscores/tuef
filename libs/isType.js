const isAlphabetic = value => {
  return /^[-_/a-zก-์. ]+$/i.test(value)
}

const isNumeric = value => {
  return /^[0-9.-]+$/.test(value)
}

const isAlphaNumeric = value => {
  return /^[-_/a-zก-์0-9. ]+$/i.test(value)
}

const isPrintable = () => {
  return true
}

export const isType = (type, value) => {
  const validators = {
    A: isAlphabetic,
    N: isNumeric,
    AN: isAlphaNumeric,
    P: isPrintable,
  }

  const validator = validators[[type]]

  let result
  if (validator) {
    result = validator(value)
  } else {
    result = false
  }
  return result
}
