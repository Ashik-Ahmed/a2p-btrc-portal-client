export default function formatNumberBD(num) {
    // Convert the number to a string
    const str = num.toString();

    // Reverse the string for easier processing from the end
    const reversed = str.split('').reverse();

    // Process the reversed string in chunks
    let result = '';
    for (let i = 0; i < reversed.length; i++) {
        if (i === 3 || (i > 3 && (i - 1) % 2 === 0)) {
            result += ',';
        }
        result += reversed[i];
    }

    // Reverse back the result to get the formatted integer part
    result = result.split('').reverse().join('');

    return result;
}

// Example usage
console.log(formatNumberBD(1234567)); // "12,34,567"
console.log(formatNumberBD(123456));  // "1,23,456"
console.log(formatNumberBD(12345));   // "12,345"
console.log(formatNumberBD(1234));    // "1,234"
console.log(formatNumberBD(123));     // "123"
