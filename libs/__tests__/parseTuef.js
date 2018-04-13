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
    it('Throw error if tag property is missing from fieldSpec', () => {
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
            name: 'fieldB',
            length: 10,
            type: 'A',
          },
        ],
      }
      const str = 'PN02030110Hell      '
      expect(() => {
        parseVaryLengthSegment(spec, str)
      }).toThrowError()
    })
    it('Throw error if length property cannot be converted to a number', () => {
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
      const str = 'PNA2030110Hell      ' // Specified A2 as length
      expect(() => {
        parseVaryLengthSegment(spec, str)
      }).toThrowError()
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
  describe('parseTuef', () => {
    const spec = {
      header: {
        lengthType: 'fixed',
        fieldSpecs: [
          {
            name: 'segmentTag',
            length: 4,
            type: 'A',
          },
          {
            name: 'version',
            length: 2,
            type: 'N',
          },
          {
            name: 'memberReferenceNo',
            length: 25,
            type: 'AN',
          },
          {
            name: 'country',
            length: 2,
            type: 'A',
          },
          {
            name: 'memberCode',
            length: 10,
            type: 'AN',
          },
          {
            name: 'subjectReferenceCode',
            length: 1,
            type: 'N',
          },
          {
            name: 'enquiryControlNumber',
            length: 9,
            type: 'N',
          },
        ],
      },
      name: {
        lengthType: 'vary',
        fieldSpecs: [
          {
            tag: 'PN',
            name: 'segmentTag',
            length: 3,
            type: 'AN',
          },
          {
            tag: '01',
            name: 'lastName1',
            length: 50,
            type: 'A',
          },
          {
            tag: '02',
            name: 'lastName2',
            length: 26,
            type: 'A',
          },
          {
            tag: '04',
            name: 'firstName',
            length: 30,
            type: 'A',
          },
          {
            tag: '05',
            name: 'middle',
            length: 26,
            type: 'A',
          },
          {
            tag: '06',
            name: 'maritalStatus',
            length: 4,
            type: 'N',
          },
          {
            tag: '07',
            name: 'dateOfBirth',
            length: 8,
            type: 'N',
          },
          {
            tag: '08',
            name: 'gender',
            length: 1,
            type: 'N',
          },
          {
            tag: '09',
            name: 'title',
            length: 15,
            type: 'P',
          },
          {
            tag: '10',
            name: 'nationality',
            length: 2,
            type: 'P',
          },
          {
            tag: '11',
            name: 'numberOfChildren',
            length: 2,
            type: 'N',
          },
          {
            tag: '12',
            name: 'spouseName',
            length: 45,
            type: 'A',
          },
          {
            tag: '13',
            name: 'occupation',
            length: 1,
            type: 'A',
          },
          {
            tag: '14',
            name: 'consentToEnquire',
            length: 1,
            type: 'A',
          },
        ],
      },
    }
    const str =
      'TUEF14                         THCC160280011493566856PN03N010105·´ÊÍº0406ÊÁÁØµÔ070825110515080121401YID03'
    const expected = {
      header: {
        country: 'TH',
        enquiryControlNumber: 493566856,
        memberCode: 'CC16028001',
        memberReferenceNo: '',
        segmentTag: 'TUEF',
        subjectReferenceCode: 1,
        version: 14,
      },
      name: {
        consentToEnquire: 'Y',
        dateOfBirth: 25110515,
        firstName: 'สมมุติ',
        gender: 2,
        lastName1: 'ทดสอบ',
        segmentTag: 'N01',
      },
    }
    expect(parseTuef(spec, str)).toEqual(expected)
  })
})
