export default function loginUser(email: string, password: string, bearToken: string) {
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
    .then((result) => result)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .catch((error: Error) => error.message);
}
