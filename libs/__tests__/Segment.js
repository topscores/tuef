import Segment from '../Segment'

describe('Segment', () => {
  describe('Validate required spec in constructor', () => {
    it('Throws error if spec is undefined', () => {
      expect(() => {
        const spec = undefined
        const data = {}
        new Segment(spec, data)
      }).toThrowError()
    })
    it('Throws error if spec.fieldSpecs is undefined', () => {
      expect(() => {
        const spec = {
          lengthType: 10,
        }
        const data = {}
        new Segment(spec, data)
      }).toThrowError()
    })
    it('Throws error if spec.lengthType is undefined', () => {
      expect(() => {
        const spec = {
          fieldSpecs: [],
        }
        const data = {}
        new Segment(spec, data)
      }).toThrowError()
    })
  })
  describe('getSemicolonSeparatedHeader', () => {
    it('Throws error if fieldSpec does not has name field', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [{}],
      }
      const data = {}
      const segment = new Segment(spec, data)
      expect(() => segment.getSemicolonSeparatedHeader()).toThrowError()
    })
    it('Return semicolon separated header', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [{ name: 'field1' }, { name: 'field2' }],
      }
      const data = {}
      const segment = new Segment(spec, data)
      expect(segment.getSemicolonSeparatedHeader()).toEqual('field1;field2')
    })
  })
  describe('toSemicolonSeparatedString', () => {
    it('Gives fieldSpec.val higher priority than fieldSpec.mapKey', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          { name: 'field1', tag: 'f1', type: 'A', length: 10, val: 'test' },
          {
            name: 'field2',
            tag: 'f2',
            type: 'N',
            length: 5,
            // Both val and mapKey is available here
            // toString must use 5 from fieldSpec.val not 10 from data[fieldSpec.mapKey]
            val: '5',
            mapKey: 'p1',
            mapFunc: val => val * 10,
          },
        ],
      }
      const data = { p1: '10' }
      const segment = new Segment(spec, data)
      expect(segment.toSemicolonSeparatedString()).toEqual('TEST      ;00005')
    })
    it('Converts using data[fieldSpec.mapKey]', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          { name: 'field1', tag: 'f1', type: 'A', length: 10, val: 'test' },
          {
            name: 'field2',
            tag: 'f2',
            type: 'N',
            length: 5,
            mapKey: 'p1',
          },
        ],
      }
      const data = { p1: 10 }
      const segment = new Segment(spec, data)
      expect(segment.toSemicolonSeparatedString()).toEqual('TEST      ;00010')
    })
    it('Converts using fieldSpec.mapFunc(data[fieldSpec.mapKey))', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          { name: 'field1', tag: 'f1', type: 'A', length: 10, val: 'test' },
          {
            name: 'field2',
            tag: 'f2',
            type: 'N',
            length: 5,
            mapKey: 'p1',
            mapFunc: val => val * 10,
          },
        ],
      }
      const data = { p1: 10 }
      const segment = new Segment(spec, data)
      expect(segment.toSemicolonSeparatedString()).toEqual('TEST      ;00100')
    })
  })
  describe('toString', () => {
    it('Gives fieldSpec.val higher priority than fieldSpec.mapKey', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          { name: 'field1', tag: 'f1', type: 'A', length: 10, val: 'test' },
          {
            name: 'field2',
            tag: 'f2',
            type: 'N',
            length: 5,
            // Both val and mapKey is available here
            // toString must use 5 from fieldSpec.val not 10 from data[fieldSpec.mapKey]
            val: '5',
            mapKey: 'p1',
            mapFunc: val => val * 10,
          },
        ],
      }
      const data = { p1: '10' }
      // Variable length segment
      const segment = new Segment(spec, data)
      expect(segment.toString()).toEqual('f110TEST      f20500005')
      // Fixed length segment
      spec.lengthType = 'fixed'
      const fixedSegment = new Segment(spec, data)
      expect(fixedSegment.toString()).toEqual('TEST      00005')
    })
    it('Converts using data[fieldSpec.mapKey]', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          { name: 'field1', tag: 'f1', type: 'A', length: 10, val: 'test' },
          {
            name: 'field2',
            tag: 'f2',
            type: 'N',
            length: 5,
            mapKey: 'p1',
          },
        ],
      }
      const data = { p1: 10 }
      // Variable length segment
      const segment = new Segment(spec, data)
      expect(segment.toString()).toEqual('f110TEST      f20500010')
      // Fixed length segment
      spec.lengthType = 'fixed'
      const fixedSegment = new Segment(spec, data)
      expect(fixedSegment.toString()).toEqual('TEST      00010')
    })
    it('Converts using fieldSpec.mapFunc(data[fieldSpec.mapKey))', () => {
      const spec = {
        lengthType: 'vary',
        fieldSpecs: [
          { name: 'field1', tag: 'f1', type: 'A', length: 10, val: 'test' },
          {
            name: 'field2',
            tag: 'f2',
            type: 'N',
            length: 5,
            mapKey: 'p1',
            mapFunc: val => val * 10,
          },
        ],
      }
      const data = { p1: 10 }
      // Variable length segment
      const segment = new Segment(spec, data)
      expect(segment.toString()).toEqual('f110TEST      f20500100')
      // Fixed length segment
      spec.lengthType = 'fixed'
      const fixedSegment = new Segment(spec, data)
      expect(fixedSegment.toString()).toEqual('TEST      00100')
    })
  })
})
