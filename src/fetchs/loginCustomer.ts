import { Dispatch, SetStateAction } from 'react';

export default function loginUser(
  email: string,
  password: string,
  bearToken: string,
  setIsAuth: Dispatch<SetStateAction<boolean>>,
) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${bearToken}`);

  const raw = JSON.stringify({
    email,
    password,
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://api.europe-west1.gcp.commercetools.com/doomsday-store/me/login', requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Вы ввели неправильное имя пользователя или пароль');
      }
      return response.text();
    })
    .then((result) => {
      // const obj = JSON.parse(result);
      // console.log('🚀 obj:', obj);
      setIsAuth(true);
      return result;
    })
    .catch((error: Error) => error.message);
}
