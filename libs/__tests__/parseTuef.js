import {
  parseFixedLengthSegment,
  parseVaryLengthSegment,
  parseTuef,
} from '../parseTuef'

describe('parseTuef', () => {
  describe('parseFixedLengthSegment', () => {
    it('Parses fixed length segment', () => {
      const spec = {
        lengthType: 'fixed',
        fieldSpecs: [
          {
            name: 'fieldA',
            length: 3,
            type: 'N',
          },
          {
            name: 'fieldB',
            length: 10,
            type: 'A',
          },
        ],
      }
      const str = '003Hell      '
      const { obj, parsedChar } = parseFixedLengthSegment(spec, str)

      expect(obj).toEqual({ fieldA: 3, fieldB: 'Hell' })
      expect(parsedChar).toEqual(13)
    })
    it('Throw error if field value does not have correct type', () => {
      const spec = {
        lengthType: 'fixed',
        fieldSpecs: [
          {
            name: 'fieldA',
            length: 3,
            type: 'N',
          },
          {
            name: 'fieldB',
            length: 10,
            type: 'A',
          },
        ],
      }
      const str = '00AHell      '
      expect(() => {
        parseFixedLengthSegment(spec, str)
      }).toThrowError()
    })
  })
  describe('parseVaryLengthSegment', () => {
    it('Parses vary length segment', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          {
            tag: 'PN',
            name: 'fieldA',
            length: 30,
            type: 'N',
          },
          {
            tag: '01',
            name: 'fieldB',
            length: 10,
            type: 'A',
          },
        ],
      }
      const str = 'PN02030110Hell      '
      const { obj, parsedChar } = parseVaryLengthSegment(spec, str)

      expect(obj).toEqual({ fieldA: 3, fieldB: 'Hell' })
      expect(parsedChar).toEqual(20)
    })

    it('Parses vary length segment with optional fields', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          {
            tag: 'PN',
            name: 'fieldA',
            length: 30,
            type: 'N',
          },
          {
            tag: 'MS',
            name: 'optionalField',
            length: 5,
            type: 'AN',
          },
          {
            tag: '01',
            name: 'fieldB',
            length: 10,
            type: 'A',
          },
        ],
      }
      const str = 'PN02030110Hell      '
      const { obj, parsedChar } = parseVaryLengthSegment(spec, str)

      expect(obj).toEqual({ fieldA: 3, fieldB: 'Hell' })
      expect(parsedChar).toEqual(20)
    })
    it('Throw error if field value does not have correct type', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          {
            tag: 'PN',
            name: 'fieldA',
            length: 3,
            type: 'N',
          },
          {
            tag: '01',
            name: 'fieldB',
            length: 10,
            type: 'A',
          },
        ],
      }
      const str = 'PN02A30110Hell      '
      expect(() => {
        parseFixedLengthSegment(spec, str)
      }).toThrowError()
    })
  })
})
