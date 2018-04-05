import { isType } from '../isType'

describe('isType', () => {
  describe('A', () => {
    it('accept A-Z', () => {
      expect(isType('A', 'abdrf')).toEqual(true)
      expect(isType('A', 'ABCD')).toEqual(true)
      expect(isType('A', 'AbcD')).toEqual(true)
    })
    it('accept thai alphabet', () => {
      expect(isType('A', 'สินค้า')).toEqual(true)
      expect(isType('A', 'ดินแดงๆ')).toEqual(true)
    })
    it('accept space', () => {
      expect(isType('A', ' ')).toEqual(true)
    })
    it('reject special character', () => {
      expect(isType('A', 'CCC*')).toEqual(false)
      expect(isType('A', '&CCC')).toEqual(false)
      expect(isType('A', '(CCC')).toEqual(false)
      expect(isType('A', '/*^')).toEqual(false)
    })
    it('reject 0-9', () => {
      expect(isType('A', 'A09')).toEqual(false)
      expect(isType('A', '9ABC')).toEqual(false)
      expect(isType('A', 'Z8BDD')).toEqual(false)
      expect(isType('A', 'ZCBDD2')).toEqual(false)
    })
  })

  describe('N', () => {
    it('reject A-Z', () => {
      expect(isType('N', 'abdrf')).toEqual(false)
      expect(isType('N', 'zader')).toEqual(false)
      expect(isType('N', 'ZZFDFGD')).toEqual(false)
      expect(isType('N', 'adbGD')).toEqual(false)
    })
    it('reject thai alphabet', () => {
      expect(isType('N', 'สินค้า')).toEqual(false)
      expect(isType('N', 'ดินแดงๆ')).toEqual(false)
    })
    it('reject special character', () => {
      expect(isType('N', 'CCC*')).toEqual(false)
      expect(isType('N', '/CCC')).toEqual(false)
      expect(isType('N', '(CCC')).toEqual(false)
      expect(isType('N', '/*)')).toEqual(false)
    })
    it('accept 0-9', () => {
      expect(isType('N', '09')).toEqual(true)
      expect(isType('N', '9')).toEqual(true)
      expect(isType('N', '80234')).toEqual(true)
      expect(isType('N', '111')).toEqual(true)
      expect(isType('N', 9)).toEqual(true)
    })
    it('accept floating point', () => {
      expect(isType('N', '1.259')).toEqual(true)
      expect(isType('N', 1.259)).toEqual(true)
    })
    it('accept negative number', () => {
      expect(isType('N', '-123.34')).toEqual(true)
      expect(isType('N', -123.34)).toEqual(true)
    })
  })

  describe('AN', () => {
    it('accept A-Z', () => {
      expect(isType('AN', 'abdrf')).toEqual(true)
      expect(isType('AN', 'zader')).toEqual(true)
      expect(isType('AN', 'ZZFDFGD')).toEqual(true)
      expect(isType('AN', 'adbGD')).toEqual(true)
    })
    it('accept thai alphabet', () => {
      expect(isType('AN', 'สินค้า')).toEqual(true)
      expect(isType('AN', 'ดินแดงๆ')).toEqual(true)
    })
    it('reject special character', () => {
      expect(isType('AN', 'CCC*')).toEqual(false)
      expect(isType('AN', '&CCC')).toEqual(false)
      expect(isType('AN', '(CCC')).toEqual(false)
      expect(isType('AN', '/*^)')).toEqual(false)
    })
    it('accept 0-9', () => {
      expect(isType('AN', 'A09')).toEqual(true)
      expect(isType('AN', '9ABC')).toEqual(true)
      expect(isType('AN', 'Z8BDD')).toEqual(true)
      expect(isType('AN', 'ZCBDD2')).toEqual(true)
    })
  })

  describe('P', () => {
    it('accept A-Z', () => {
      expect(isType('P', 'abdrf')).toEqual(true)
      expect(isType('P', 'zader')).toEqual(true)
      expect(isType('P', 'ZZFDFGD')).toEqual(true)
      expect(isType('P', 'adbGD')).toEqual(true)
    })
    it('accept thai alphabet', () => {
      expect(isType('P', 'สินค้า')).toEqual(true)
      expect(isType('P', 'ดินแดงๆ')).toEqual(true)
    })
    it('accept special character', () => {
      expect(isType('P', 'CCC*')).toEqual(true)
      expect(isType('P', '_CCC')).toEqual(true)
      expect(isType('P', '(CCC')).toEqual(true)
      expect(isType('P', '/*_)')).toEqual(true)
    })
    it('accept 0-9', () => {
      expect(isType('P', 'A09')).toEqual(true)
      expect(isType('P', '9ABC')).toEqual(true)
      expect(isType('P', 'Z8BDD')).toEqual(true)
      expect(isType('P', 'ZCBDD2')).toEqual(true)
    })
    it('accept space', () => {
      expect(isType('P', ' ')).toEqual(true)
      expect(isType('P', '  ')).toEqual(true)
    })
  })

  describe('Invalid type', () => {
    it('reject A-Z', () => {
      expect(isType('fdsP', 'abdrf')).toEqual(false)
      expect(isType('Pddd', 'zader')).toEqual(false)
      expect(isType('P54564', 'ZZFDFGD')).toEqual(false)
      expect(isType('Pfdsfds', 'adbGD')).toEqual(false)
    })
    it('reject special character', () => {
      expect(isType('PA', 'CCC*')).toEqual(false)
      expect(isType('PB', '_CCC')).toEqual(false)
      expect(isType('BP', '(CCC')).toEqual(false)
      expect(isType('fsdP', '/*_)')).toEqual(false)
    })
    it('reject 0-9', () => {
      expect(isType('/P', 'A09')).toEqual(false)
      expect(isType('xxP', '9ABC')).toEqual(false)
      expect(isType('234P', 'Z8BDD')).toEqual(false)
      expect(isType('dfP', 'ZCBDD2')).toEqual(false)
    })
    it('reject space', () => {
      expect(isType('ffP', ' ')).toEqual(false)
      expect(isType('ffP', '  ')).toEqual(false)
    })
  })
})
