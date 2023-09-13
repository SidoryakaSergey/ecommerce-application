export default async function createCart(token: string) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const raw = '{\r\n  "currency" : "USD"\r\n}';

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(
    'https://api.europe-west1.gcp.commercetools.com/doomsday-store/me/carts',
    requestOptions,
  );

  const responseData = await response.text();

  return responseData;
}
