import getAdminToken from './getAdminToken.ts';

export default async function getProducts(
  page: number,
  limit: number,
  sortByName: boolean,
  isAscendingName: boolean,
  isAscendingPrice: boolean,
  catalogValue?: string,
) {
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
  let sortString: string;
  const offset = page ? (page - 1) * limit : 0;

  if (sortByName) {
    sortString = isAscendingName ? 'name.en-us+asc' : 'name.en-us+desc';
  } else {
    sortString = isAscendingPrice
      ? 'priceCurrency=USD&text.en-US=&sort=price+asc'
      : 'priceCurrency=USD&text.en-US=&sort=price+desc';
  }

  const queryParameters = `limit=${limit}&offset=${offset.toString()}&sort=${sortString}`;

  return categoriesId
    ? fetch(
        `https://api.europe-west1.gcp.commercetools.com/doomsday-store/product-projections/search?filter=categories.id:"${categoriesId}"&${queryParameters}`,
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
        })
    : fetch(
        `https://api.europe-west1.gcp.commercetools.com/doomsday-store/product-projections/search?&${queryParameters}`,
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
