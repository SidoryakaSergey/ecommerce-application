import getAdminToken from './getAdminToken.ts';

export default async function getProduct(id: string) {
  const myHeaders = new Headers();
  const adminToken = await getAdminToken();
  myHeaders.append('Authorization', `Bearer ${adminToken}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://api.europe-west1.gcp.commercetools.com/doomsday-store/products/${id}`,
    requestOptions,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при получении продукта');
      }
      return response.json();
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
}
