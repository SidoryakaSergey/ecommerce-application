export default async function registerCustomer(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer EbtNfV3cTSTIhy5iBCS7I5REOLXII6QH');

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
