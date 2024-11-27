Will not run because credentials file is not tracked.
You can still run this app using mock data mode by setting useCredentials to false in apiService.js

create your own credentials file:

credentials.js{
const OpenWeather_key = 'your key';
export const WorldTime_key = 'your key';

export default OpenWeather_key;
}