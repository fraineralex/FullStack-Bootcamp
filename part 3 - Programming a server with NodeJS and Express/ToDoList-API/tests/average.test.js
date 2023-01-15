const { average } = require('../utils/for_testing')

describe('average', () => {
    test('of one value is the value itself', () => {
        expect(average([1])).toBe(1)
    })
})

describe('average', () => {
    test('of many is calculated correctly', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })
})

describe('average', () => {
    test('of empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})

describe('average', () => {
    test('of undefined value return undefined', () => {
        expect(average()).toBeUndefined()
    })
})