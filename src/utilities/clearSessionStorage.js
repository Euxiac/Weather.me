if (typeof sessionStorage !== 'undefined') {
    sessionStorage.clear();
    console.log('sessionStorage has been cleared!');
} else {
    console.log('sessionStorage is not available.');
}
