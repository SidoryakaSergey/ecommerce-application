export default async function updateCart(
  idCart: string,
  idProduct: string,
  version: number,
  token: string,
) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  console.log(idProduct);

  const raw = `{\r
  "version" : ${version},\r
  "actions" : [ {\r
    "action" : "addLineItem",\r
    "productId" : "${idProduct}",\r
    "variantId" : 1,\r
    "quantity" : 1\r
  } ]\r
}`;

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    `https://api.europe-west1.gcp.commercetools.com/doomsday-store/me/carts/${idCart}`,
    requestOptions,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при добавлении продукта');
      }
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
}
