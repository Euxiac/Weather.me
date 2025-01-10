//This is the global config file for the front end

//toggle to use mock data or call data from the api
export const useMockData = true; //true or false

//toggle to store data in session or local storage NOT IMPLEMENTED
export const storageMode = sessionStorage; //SessionStorage or LocalStorage

//API address for calls, change to the port you are hosting your BE
export const APIAddress = 'http://localhost:8000';

export default useMockData;
