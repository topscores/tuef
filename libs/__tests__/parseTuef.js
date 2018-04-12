import { parseFixedLengthSegment, parseTuef } from '../parseTuef'

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
})
