import util from 'util'
import { isType } from './isType'
import { isValueAvailable, lpad, rpad, truncate, toWin874 } from './utils'

export default class Field {
  constructor(spec, val, defaultVal) {
    this.spec = spec
    if (isValueAvailable(defaultVal)) {
      this.val = val || defaultVal
    } else {
      this.val = val
    }
  }

  toString(lengthType = 'vary') {
    let result
    const { spec } = this
    // Check for blank field
    if (!isValueAvailable(this.val) || this.val === '') {
      // Required field cannot be blank
      if (spec.required) {
        throw new TypeError(
          `Required field ${spec.name} not found in ${util.inspect(this)}`
        )
      }
      // This field is optional return empty string
      return ''
    }

    // Validate input type
    if (!isType(spec.type, this.val)) {
      throw new TypeError(
        `${spec.name} must be ${spec.type}` +
          `, Field val = ${util.inspect(this.val)}`
      )
    }

    // this.length is a required field
    if (spec.length !== undefined) {
      // Zero padding for type N
      if (spec.type === 'N') {
        result = lpad(this.val, spec.length, 0)

        // For Type A and AN convert to upper case before padding
      } else if (spec.type === 'A' || spec.type === 'AN') {
        result = rpad(this.val.toUpperCase(), spec.length, ' ')

        // Type P can be any printable letter include upper and lower case
      } else {
        result = rpad(this.val, spec.length)
      }
      result = truncate(result, spec.length)

      // Add tag and length(2 digits) as a prefix
      if (lengthType === 'vary') {
        // Variable length field need tag
        if (spec.tag !== undefined) {
          // convert length 1 - 9 to 01 - 09
          const resultLength = lpad(result.length, 2, 0)
          result = spec.tag + resultLength + result
        } else {
          throw new Error(
            `Missing tag property in ${spec.name} field` +
              `, Field data = ${util.inspect(this)}`
          )
        }
      }

      // Throw error if this.length is not provided
    } else {
      throw new Error(
        `Missing length property in ${spec.name} field` +
          `Field data = ${util.inspect(this)}`
      )
    }

    return toWin874(result)
  }
}
