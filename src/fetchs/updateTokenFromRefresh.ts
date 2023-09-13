import { ResponseData } from '../interfaces';

export default async function updateTokenFromRefresh() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append(
    'Authorization',
    'Basic Tm9rakREa2RsVEFEY2U4TlFjNDl0R0dpOjd3dmdYbk1NNXJTeEVjWjduYjZTUEtoVFFUXzlia2V3',
  );

  const refreshToken = localStorage.getItem('refreshToken') as string;

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'refresh_token');
  urlencoded.append('refresh_token', `${refreshToken}`);

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
        throw new Error(result.message);
      }
      localStorage.setItem('bearToken', result.access_token);

      return result;
    });
}
