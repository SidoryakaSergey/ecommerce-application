export default async function getCart(token: string) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      'https://api.europe-west1.gcp.commercetools.com/doomsday-store/me/carts',
      requestOptions,
    );
    const result = await response.text();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
}
