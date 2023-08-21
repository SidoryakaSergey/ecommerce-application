import getAdminToken from './getAdminToken.ts';

export default async function registerCustomer(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
) {
  const myHeaders = new Headers();
  const adminToken = await getAdminToken();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${adminToken}`);

  const raw = JSON.stringify({
    email,
    firstName,
    lastName,
    password,
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://api.europe-west1.gcp.commercetools.com/doomsday-store/customers',
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error: Error) => error.message);
}
