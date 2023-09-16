import getAdminToken from './getAdminToken.ts';

export default async function getProducts(catalogValue?: string, page?: number) {
  let categoriesId: undefined | string;
  if (catalogValue) {
    if (catalogValue === 'thrillers') {
      categoriesId = 'd3640069-6f36-42b9-bd3e-6a4ef563ef34';
    } else if (catalogValue === 'erotica') {
      categoriesId = '05720a1c-d222-4528-9331-b29363a5bfad';
    } else if (catalogValue === 'horrors') {
      categoriesId = '19c9ac10-3a54-4527-a385-85db23dccca8';
    }
  }
  const myHeaders = new Headers();
  const adminToken = await getAdminToken();
  myHeaders.append('Authorization', `Bearer ${adminToken}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const limit = 10; // Количество элементов на странице
  const offset = page ? (page - 1) * limit : 0; // смещение на странице

  const queryParameters = `limit=${limit}&offset=${offset}`;

  return categoriesId
    ? fetch(
        `https://api.europe-west1.gcp.commercetools.com/doomsday-store/product-projections/search?filter=categories.id:"${categoriesId}"&${queryParameters}`,
        requestOptions,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка при получении продуктов');
          }
          // console.log(response.json().then((res) => console.log(res)));
          return response.json();
        })
        .catch((error: Error) => {
          throw new Error(error.message);
        })
    : fetch(
        `https://api.europe-west1.gcp.commercetools.com/doomsday-store/products/?${queryParameters}`,
        requestOptions,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка при получении продуктов');
          }
          return response.json();
        })
        .catch((error: Error) => {
          throw new Error(error.message);
        });
}
