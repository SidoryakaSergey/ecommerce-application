import getAdminToken from './getAdminToken.ts';

export default async function updatePassword(
  id: string,
  version: number,
  currentPassword: string,
  newPassword: string,
) {
  const myHeaders = new Headers();
  const adminToken = await getAdminToken();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${adminToken}`);

  const raw = JSON.stringify({
    id,
    version,
    currentPassword,
    newPassword,
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    `https://api.europe-west1.gcp.commercetools.com/doomsday-store/customers/password`,
    requestOptions,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error on changing password');
      }
      return response.json();
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
}
