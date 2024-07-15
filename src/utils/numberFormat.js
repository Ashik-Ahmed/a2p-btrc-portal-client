export default function formatNumberBD(num) {
    // Convert the number to a string
    const str = num?.toString();

    // Reverse the string for easier processing from the end
    const reversed = str?.split('')?.reverse();

    // Process the reversed string in chunks
    let result = '';
    for (let i = 0; i < reversed?.length; i++) {
        if (i === 3 || (i > 3 && (i - 1) % 2 === 0)) {
            result += ',';
        }
        result += reversed[i];
    }

    // Reverse back the result to get the formatted integer part
    result = result?.split('').reverse().join('');

    return result;
}
