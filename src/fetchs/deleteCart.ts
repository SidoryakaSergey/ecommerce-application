export default async function deleteCart(token: string, id: string, version: number) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  const response = await fetch(
    `https://api.europe-west1.gcp.commercetools.com/doomsday-store/me/carts/${id}?version=${version}`,
    requestOptions,
  );

  localStorage.removeItem('cartId');

  const responseData = await response.text();

  return responseData;
}
