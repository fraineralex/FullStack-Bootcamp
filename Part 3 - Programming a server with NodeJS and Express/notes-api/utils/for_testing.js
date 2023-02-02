const palindrome = (string) => {
    if (typeof string === 'undefined' && string === '') return undefined

    return string
        .split('')
        .reverse()
        .join('')
}

const average = array => {
    if (typeof array === 'undefined') return undefined
    if (array.length === 0) return 0

    let sum = 0
    array.forEach(num => { sum += num })

    return sum / array.length
}

module.exports = {
    palindrome,
    average
}