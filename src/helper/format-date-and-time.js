import moment from "moment";

// Ocekivan dobiveni parametar datuma 2020-04-22
export const formatDate = (date) => {
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  return `${day}.${month}.${year}.`;
};

// Ocekivandobiveni parametar datuma 22.08.2021
export const formatDateReverse = (date) => {
  const year = date.substr(6, 4);
  const month = date.substr(3, 2);
  const day = date.substr(0, 2);
  return `${year}-${month}-${day}`;
};

// Ocekivan dobiveni parametar vremena 09:20:00
export const formatTime = (time) => {
  const hour = time.substr(0, 2);
  const min = time.substr(3, 2);
  return `${hour}:${min}`;
};

// Ocekivan dobiveni parametar vremena 09:20
export const formatLongTime = (time) => {
  const hour = time.substr(0, 2);
  const min = time.substr(3, 2);
  return `${hour}:${min}:00`;
};

// Dohvacanje danasnjeg datuma
export const getTodaysDate = () => {
  const today = new Date();
  const dd = ("0" + today.getDate()).slice(-2);
  const mm = ("0" + (today.getMonth() + 1)).slice(-2); // January is 0!
  const yyyy = today.getFullYear();
  const todayDate = yyyy + "-" + mm + "-" + dd;
  // return todayDate;
  return "2023-04-20";
};

export const getCurrentTIme = () => {
  const hour = moment().hour().toString().length === 1 ? `0${moment().hour()}` : moment().hour();
  const minute = moment().minute().toString().length === 1 ? `0${moment().minute()}` : moment().minute();

  return `${hour}:${minute}`;
};
