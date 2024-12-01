import { fetchCurrentTime } from "../services/apiService";

export function SetLastUpdate() {
  const currentDt = new Date();
  sessionStorage.setItem(
    "LastUpdatedTime",
    JSON.stringify({
      "day": currentDt.getDate(),
      "month": currentDt.getMonth() + 1,
      "year": currentDt.getFullYear(),
      "hour": currentDt.getHours(),
      "minute": currentDt.getMinutes(),
    })
  );
}

export function GrabTime() {
  if(sessionStorage.getItem("time") === null || MinuteIsCurrent === false) {
    fetchCurrentTime()
        .then((res) => {
          return res
        }).catch((err) => {
          console.log(err);})
  }
  else {
    return sessionStorage.getItem("time");
  }
}

//check time function checks the time and returns false if the time does not match to the hour and true if it does
export function MinuteIsCurrent() {
  let currentDt = new Date();
  const formatedDt = JSON.stringify({
    "day": currentDt.getDate(),
    "month": currentDt.getMonth() + 1,
    "year": currentDt.getFullYear(),
    "hour": currentDt.getHours(),
    "minute": currentDt.getMinutes(),
  });
  const lastUpdate = sessionStorage.getItem("LastUpdatedTime")

  //console.log(`current = ${formatedDt} and lastUpdated = ${lastUpdate}`);
  //check if there is a stored time

  if (sessionStorage.getItem("time") === null || formatedDt !== lastUpdate) {
    fetchCurrentTime()
      .then((res) => {
        sessionStorage.setItem("time", JSON.stringify(res));
        SetLastUpdate();
        console.log(`date and time DONT match to the minute, time updated`);
        //console.log('updated session time');
      })
      .catch((err) => {
        console.log(err);
      });
    return false;
  }
  //console.log(`date and time match to the minute, time did not update`);
  return true;
}

export default MinuteIsCurrent;
