import { BASE_URL } from "./constants";
import { setCookie } from "./cookie";

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
  })
  .then(checkReponse)
  .catch((err) => {
    console.log(err)
  })
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      // обновляем токены
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      // повторяем запрос
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const checkReponse = (res) => {
  return res.ok 
  ? res.json() 
  : res.json()
  .then((err) => {
    console.log(err)
    Promise.reject(`Error ${res.status}`)
  });
};