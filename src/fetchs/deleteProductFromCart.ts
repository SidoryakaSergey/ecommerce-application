export default async function deleteProductFromCartFetch(
  idCart: string,
  idProduct: string,
  version: number,
  token: string,
) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const raw = `{\r
  "version" : ${version},\r
  "actions" : [ {\r
    "action" : "removeLineItem",\r
    "lineItemId" : "${idProduct}"\r
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
        throw new Error('Error deleting product. Please try again later.');
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
