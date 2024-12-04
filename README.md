# Weather.me  

Weather.me is a modular, personalizable weather application designed to empower users by giving them full control over their weather dashboard. It allows users to choose what information they want to see and organize it in a way that best suits their needs.  

The application is built with **React** and styled using the **Material UI** library, offering a sleek, seamless design that enhances the user experience. The front end is supported by the **CombinedWeatherAPI** on the back end, which handles the heavy lifting by efficiently retrieving and processing weather data, delivering it to users in a clear and user-friendly format.  

This repository holds the front end of Weather.me.  
To view the backend API supporting this application, visit: [CombinedWeatherAPI](https://github.com/Euxiac/CombinedWeatherAPI).  
To view business documentation and access working files like graphics, visit this google drive [Weather.me Working Materials](https://drive.google.com/drive/folders/115whs7jF2DHDPpa8fSlnfOi2wL2bdvz_?usp=sharing)  

---

## How to Get Weather.me Running  

Weather.me is designed to be straightforward to set up, as most authentication, credentials, and configuration are handled in the back end.  

1. **Download or pull the repository.**  
2. **Install the NPM packages:**  
   ```bash
   npm install
   ```
3. **Adjust the configuration settings** as you like them *(see notes for configuration settings)*
4. If you do not have the CombinedWeatherAPI set up, set ‘useMockData’ on appConfig to true. This will populate the app with mock data instead of real time data.
5. **Run app using:**
   ```bash
   npm run dev
   ```
---
## Notes  

### App Configurations  
You can adjust app configurations in `appConfig.jsx`:  
- **`useMockData`**: Forces the app to use mock data instead of calling the APIs. Useful for testing.  
- **`storageMode`**: Switches the save mode of the app:  
  - `LocalStorage`: Persists user data until the cache is cleared.  
  - `sessionStorage` (default): Wipes data every time the user closes the tab. Useful for testing.  
- **`APIAddress`**: Change this to the address where you are hosting the **CombinedWeatherAPI**.  

![1](https://github.com/user-attachments/assets/07adb6dc-c3ab-49dd-9220-fefea0d6a15d)
---

### Mock Data  
Mock data can be found in `/src/data`. By default, the mock data includes:  
- **Location Data**: Covers Australia (two cities per state) and the fictional "Ironland," coined by *Geography Now*.  
- **Weather, Coordinate, and Time Data**: A snapshot of Perth, Western Australia.  

---

### Adding Widgets  
To add a widget:  
1. Add its `.jsx` file to `/src/components/widgets`.  
2. Update the `availableCards` list in `/src/components/basic/CardManager.jsx` with your component
Example:  
```javascript
   {
      name: "Weather Right Now",
      icon: <TodayIcon />,
      background: true,
      widget: <Widget_RightNow />,
      forms: [{ id: 0, name: "UnitForm", form: <formComponents.UnitForm /> }],
    }
```
3. If you leave forms empty, the edit funcitonality of the card will be disabled
![2](https://github.com/user-attachments/assets/2cd8d420-55f0-4ac8-8804-d47410c37a75)


---
### Authenticating and Backend API Calls  

The authentication and backend API calls should work right out of the box, as long as the `APIAddress` is set up correctly in the `appConfig.jsx`. The app automatically retrieves its own authentication token and handles token refreshing without any additional configuration required from the user.

Finally,
---
Happy weathering!





