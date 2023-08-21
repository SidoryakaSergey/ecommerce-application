import { ResponseData } from '../interfaces';

export default async function tryToGetToken(email: string, password: string) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append(
    'Authorization',
    'Basic Tm9rakREa2RsVEFEY2U4TlFjNDl0R0dpOjd3dmdYbk1NNXJTeEVjWjduYjZTUEtoVFFUXzlia2V3',
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'password');
  urlencoded.append('username', email);
  urlencoded.append('password', password);
  urlencoded.append('scope', 'manage_project:doomsday-store');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  return fetch(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/doomsday-store/customers/token',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result: ResponseData) => {
      if ('error' in result) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(result.message);
      }

      if (!localStorage.getItem('bearToken')) {
        localStorage.setItem('bearToken', result.access_token);
      }

      return result;
    });
}
