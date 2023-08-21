import { AccessAdminToken } from '../interfaces';

export default async function getAdminToken() {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Basic Tm9rakREa2RsVEFEY2U4TlFjNDl0R0dpOjd3dmdYbk1NNXJTeEVjWjduYjZTUEtoVFFUXzlia2V3',
  );

  const raw = '';

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  let adminToken = '';

  await fetch(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: AccessAdminToken = JSON.parse(result);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      adminToken = data.access_token;
    })
    .catch((error: Error) => error.message);

  return adminToken;
}
