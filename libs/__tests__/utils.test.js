import iconv from 'iconv-lite'
import {
  isValidDate,
  isValueAvailable,
  lpad,
  rpad,
  truncate,
  yyyymmdd,
  toWin874,
  isArray,
} from '../utils'

describe('utils', () => {
  describe('isValidate', () => {
    it('return true for valid date', () => {
      const date = new Date()
      expect(isValidDate(date)).toEqual(true)
    })
    it('return false for not valid date', () => {
      const date = new Date('')
      expect(isValidDate(date)).toEqual(false)
    })
  })
  describe('isValueAvailable', () => {
    it('return false for undefined', () => {
      expect(isValueAvailable(undefined)).toEqual(false)
    })
    it('return false for null', () => {
      expect(isValueAvailable(null)).toEqual(false)
    })
    it('return true for 0', () => {
      expect(isValueAvailable(0)).toEqual(true)
    })
  })
  describe('isArray', () => {
    it('Returns true if val is an empty array', () => {
      const arr = []
      expect(isArray(arr)).toEqual(true)
    })
    it('Returns true if val is an array', () => {
      const arr = [1, 2, 3]
      expect(isArray(arr)).toEqual(true)
    })
    it('Return false if val is not an array', () => {
      const notarr = 'hahahaha'
      expect(isArray(notarr)).toEqual(false)
    })
    it('Return false if val is undefined', () => {
      const obj = {}
      expect(isArray(obj.notarr)).toEqual(false)
    })
  })
  describe('lpad', () => {
    it('convert input to string before padding', () => {
      expect(lpad(12, 5)).toEqual('   12')
      expect(lpad(12, 5, 0)).toEqual('00012')
      expect(lpad(12, 5, 'x')).toEqual('xxx12')
    })
    it('left pad string shorter than specified length', () => {
      expect(lpad('12', 5)).toEqual('   12')
      expect(lpad('12', 5, 0)).toEqual('00012')
      expect(lpad('12', 5, 'x')).toEqual('xxx12')
    })
    it('does not modify string longer than or equal to specified length', () => {
      expect(lpad('12113', 5)).toEqual('12113')
      expect(lpad('1211345', 5, 0)).toEqual('1211345')
      expect(lpad('1211345', 5, 'x')).toEqual('1211345')
    })
  })
  describe('rpad', () => {
    it('convert input to string before padding', () => {
      expect(rpad(12, 5)).toEqual('12   ')
      expect(rpad(12, 5, 0)).toEqual('12000')
      expect(rpad(12, 5, 'x')).toEqual('12xxx')
    })
    it('right pad string shorter than specified length', () => {
      expect(rpad('12', 5)).toEqual('12   ')
      expect(rpad('12', 5, 0)).toEqual('12000')
      expect(rpad('12', 5, 'x')).toEqual('12xxx')
    })
    it('does not modify string longer than or equal to specified length', () => {
      expect(rpad('12113', 5)).toEqual('12113')
      expect(rpad('1211345', 5, 0)).toEqual('1211345')
      expect(rpad('1211345', 5, 'x')).toEqual('1211345')
    })
  })
  describe('truncate', () => {
    it('convert input to string before truncating', () => {
      expect(truncate(11111, 3)).toEqual('111')
      expect(truncate(11, 3)).toEqual('11')
    })
    it('truncate string longer than specified length', () => {
      expect(truncate('11111', 3)).toEqual('111')
    })
    it('does not modify string shorter than specified length', () => {
      expect(truncate('11', 3)).toEqual('11')
    })
  })
  describe('yyyymmdd', () => {
    it('convert date to YYYYMMDD', () => {
      let dateStr
      dateStr = yyyymmdd(new Date('2016-8-1'))
      expect(dateStr).toEqual('20160801')
      dateStr = yyyymmdd(new Date('2016-10-12'))
      expect(dateStr).toEqual('20161012')
    })
    it('throw error if argument is not Date type', () => {
      const dateStr = '2016-8-1'
      expect(yyyymmdd.bind(null, dateStr)).toThrow(TypeError)
      expect(yyyymmdd.bind(null, new Date('abc'))).toThrow(TypeError)
    })
  })
  describe('toWin874', () => {
    it('Convert characters to latin1 encoding with win874 charset', () => {
      const str = 'test ทดสอบ'
      const win874 = toWin874(str)
      expect(win874).toEqual(iconv.encode(str, 'win874'))
    })
  })
})
