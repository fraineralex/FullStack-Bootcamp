const { palindrome } = require('../utils/for_testing')

test('palinforme of fraineralex', () => {
    const result = palindrome('fraineralex')

    expect(result).toBe('xelareniarf')
})

test('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
})

test('palindrome of undefined', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
})