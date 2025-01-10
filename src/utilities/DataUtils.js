import mock_location from '../data/mock_location.json';

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(str) {
    if (str !== null) {
        return str
            .split(' ') // Split the string into an array of words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
            .join(' '); // Join the words back into a single string
    }
}

export default capitalizeWords;
