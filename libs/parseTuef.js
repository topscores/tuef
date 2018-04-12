import { isType } from './isType'
export const parseFixedLengthSegment = (spec, str) => {
  const obj = {}
  let parsedChar = 0

  spec.fieldSpecs.forEach(fieldSpec => {
    const fieldVal = str.substr(parsedChar, fieldSpec.length)
    if (isType(fieldSpec.type, fieldVal)) {
      obj[fieldSpec.name] =
        fieldSpec.type === 'N' ? parseInt(fieldVal, 10) : fieldVal.trim()
      parsedChar += fieldSpec.length
    } else {
      throw Error(
        `Expect ${fieldSpec.name} to be ${fieldSpec.type} but got ${fieldVal}`
      )
    }
  })

  return { obj, parsedChar }
}
export const parseVaryLengthSegment = (spec, str) => {
  return str
}
export const parseTuefSegment = (spec, str) => {
  return spec.lengthType === 'fixed'
    ? parseFixedLengthSegment(spec, str)
    : parseVaryLengthSegment(spec, str)
}
export const parseTuef = (spec, str) => {
  let parsedChar = 0
  const segmentNames = Object.keys(spec)
  return Object.values(spec)
    .map(segmentSpec => {
      const parsed = parseTuefSegment(segmentSpec, str.substr(parsedChar))
      parsedChar += parsed.parsedChar
      return parsed.obj
    })
    .reduce((response, parsedSpec, idx) => {
      response[segmentNames[idx]] = parsedSpec
      return response
    }, {})
}
