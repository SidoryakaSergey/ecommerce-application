export default async function updateCartChangeQuantity(
  idCart: string,
  idProduct: string,
  version: number,
  token: string,
  quantity: number,
) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const raw = `{\r
  "version" : ${version},\r
  "actions" : [ {\r
    "action" : "changeLineItemQuantity",\r
    "lineItemId" : "${idProduct}",\r
    "quantity" : ${quantity}\r
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
        throw new Error('Error adding product quantity. Please try again later.');
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
