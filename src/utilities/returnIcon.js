function returnIcon(code) {
    const altText = () => {
        switch (code) {
            case '01d' || '01n':
                return 'clear sky';
            case '02d' || '02d':
                return 'few clouds';
            case '03d' || '03n':
                return 'scattered clouds';
            case '04d' || '04d':
                return 'broken clouds';
            case '09d' || '09n':
                return 'shower rain';
            case '10d' || '10d':
                return 'rain';
            case '11d' || '11n':
                return 'thunderstorm';
            case '13d' || '13d':
                return 'snow';
            case '50d' || '50n':
                return 'mist';
            default:
                return 'weather icon';
        }
    };
    let a = `https://openweathermap.org/img/wn/${code}@2x.png`;
    return <img src={a} alt={altText(code)}></img>;
}

export default returnIcon;
