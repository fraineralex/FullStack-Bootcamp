const { palindrome } = require('../utils/for_testing')

test.skip('palinforme of fraineralex', () => {
    const result = palindrome('fraineralex')

    expect(result).toBe('xelareniarf')
    'rfw'.includes
    Math.max()
})

test.skip('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
})