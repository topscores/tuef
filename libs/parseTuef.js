import iconv from 'iconv-lite'
import util from 'util'
import { isType } from './isType'

export const parseFixedLengthSegment = (spec, str) => {
  const obj = {}
  let parsedChar = 0

  spec.fieldSpecs.forEach(fieldSpec => {
    const buffer = Buffer.from(
      str.substr(parsedChar, fieldSpec.length),
      'latin1'
    )
    const fieldVal = iconv.decode(buffer, 'win874')
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
  const obj = {}
  let parsedChar = 0

  spec.fieldSpecs.forEach(fieldSpec => {
    // Tag property is required for variable length field
    if (typeof fieldSpec.tag === 'undefined') {
      throw Error(
        `Expect property tag on variable length fieldSpec, spec = ${util.inspect(
          spec
        )} fieldSpec = ${util.inspect(fieldSpec)}`
      )
    }
    // Tag must be 2 characters
    const tag = str.substr(parsedChar, 2)
    // This is not this tag fieldSpec dont process
    if (fieldSpec.tag !== tag) {
      return
    }
    parsedChar += 2

    // Length must be 2 character
    const length = parseInt(str.substr(parsedChar, 2), 10)
    if (Number.isNaN(length)) {
      throw Error(
        `Error parsing field ${
          fieldSpec.name
        }, length must be string but got ${str.substr(parsedChar, 2)}`
      )
    }
    parsedChar += 2

    // Extract field value
    const buffer = Buffer.from(str.substr(parsedChar, length), 'latin1')
    const fieldVal = iconv.decode(buffer, 'win874')
    parsedChar += length

    if (isType(fieldSpec.type, fieldVal)) {
      obj[fieldSpec.name] =
        fieldSpec.type === 'N' ? parseInt(fieldVal, 10) : fieldVal.trim()
    } else {
      throw Error(
        `Expect ${fieldSpec.name} to be ${fieldSpec.type} but got ${fieldVal}`
      )
    }
  })

  return { obj, parsedChar }
}
export const parseTuefSegment = (spec, str) => {
  let segment
  if (spec.lengthType === 'fixed') {
    segment = parseFixedLengthSegment(spec, str)
  } else {
    segment = parseVaryLengthSegment(spec, str)
  }
  // If segment has subfield
  if (typeof spec.childSegment !== 'undefined') {
    let { parsedChar } = segment
    const childSegmentNames = Object.keys(spec.childSegment)
    segment.obj.childSegment = Object.values(spec.childSegment)
      .map((childSegmentSpec, idx) => {
        const response = []
        // First two character of segment is segment tag
        let tag = str.substr(parsedChar, 2)
        while (tag === childSegmentNames[idx]) {
          const parsedSegment = parseTuefSegment(
            childSegmentSpec,
            str.substr(parsedChar)
          )
          parsedChar += parsedSegment.parsedChar
          response.push(parsedSegment.obj)
          tag = str.substr(parsedChar, 2)
        }
        return response
      })
      .reduce((response, parsedSegment, idx) => {
        response[childSegmentNames[idx]] = parsedSegment
        return response
      }, {})
    segment.parsedChar = parsedChar
  }
  return segment
}
export const parseTuef = (spec, str) => {
  let parsedChar = 0

  // Parse header
  const header = str.substr(parsedChar, 53)
  const parsedHeader = parseFixedLengthSegment(spec.header, header)
  parsedChar += 53

  // Parse body
  const segmentNames = Object.keys(spec)
  const parsed = Object.values(spec)
    .map((segmentSpec, idx) => {
      const response = []
      // First two character of segment is segment tag
      let tag = str.substr(parsedChar, 2)
      while (tag === segmentNames[idx]) {
        const parsedSegment = parseTuefSegment(
          segmentSpec,
          str.substr(parsedChar)
        )
        parsedChar += parsedSegment.parsedChar
        response.push(parsedSegment.obj)
        tag = str.substr(parsedChar, 2)
      }
      return response
    })
    .reduce((response, parsedSegment, idx) => {
      response[segmentNames[idx]] = parsedSegment
      return response
    }, {})
  parsed.header = parsedHeader.obj

  return parsed
}
