import Field from '../Field'
import { toWin874 } from '../utils'

describe('TUEF Field', () => {
  describe('toString', () => {
    describe('Validate input before converting', () => {
      it('Throws error if val for a required field is not available', () => {
        const spec = {
          name: 'test',
          tag: 't1',
          type: 'A',
          required: true,
          length: 10,
        }

        const field = new Field(spec, '')
        expect(() => {
          field.toString()
        }).toThrow(TypeError)
      })
      it('Throws error if val is not of a valid type', () => {
        const spec = {
          name: 'test',
          tag: 't1',
          type: 'A',
          required: true,
          length: 10,
        }

        const field = new Field(spec, '12345')
        expect(() => {
          field.toString()
        }).toThrow(TypeError)
      })
      it('Throws error if tag is not available for variable type field', () => {
        const spec = {
          name: 'test',
          type: 'A',
          required: true,
          length: 10,
        }

        const field = new Field(spec, 'hello')
        expect(() => {
          field.toString()
        }).toThrow(Error)
      })
      it('Throws error if length is not available', () => {
        const spec = {
          name: 'test',
          tag: 't1',
          type: 'A',
          required: true,
        }

        const field = new Field(spec, 'hello')
        expect(() => {
          field.toString()
        }).toThrow(Error)
      })
    })
    describe('Converts variable length field', () => {
      it('Uses defaultValue instead of val if not available', () => {
        const spec = {
          name: 'test',
          tag: 't1',
          type: 'A',
          required: true,
          length: 10,
        }

        const field = new Field(spec, '', 'default')
        expect(field.toString()).toEqual(toWin874('t110DEFAULT   '))
      })
      it('Converts val to toef string', () => {
        const spec = {
          name: 'test',
          tag: 't1',
          type: 'A',
          required: true,
          length: 10,
        }

        const field = new Field(spec, 'heLLo')
        expect(field.toString()).toEqual(toWin874('t110HELLO     '))
      })
      it('Returns empty string if field is optional and val is empty', () => {
        const spec = {
          name: 'test',
          tag: 't1',
          type: 'A',
          length: 10,
        }

        const field = new Field(spec, '')
        expect(field.toString()).toEqual('')
      })
    })
    describe('Convert fixed length field', () => {
      it('Uses defaultValue instead of val if not available', () => {
        const spec = {
          name: 'test',
          type: 'A',
          required: true,
          length: 10,
        }

        const field = new Field(spec, '', 'default')
        expect(field.toString('fixed')).toEqual(toWin874('DEFAULT   '))
      })
      it('Converts val to uppercase for A and AN', () => {
        const spec = {
          name: 'test',
          type: 'A',
          required: true,
          length: 10,
        }

        const field = new Field(spec, 'heLLo')
        expect(field.toString('fixed')).toEqual(toWin874('HELLO     '))
      })
      it('Returns empty string if field is optional and val is empty', () => {
        const spec = {
          name: 'test',
          type: 'A',
          length: 10,
        }

        const field = new Field(spec, '')
        expect(field.toString('fixed')).toEqual('')
      })
    })
  })
})
