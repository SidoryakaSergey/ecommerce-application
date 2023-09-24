import getAdminToken from './getAdminToken.ts';
import { RawData } from '../interfaces';

export default async function registerCustomer(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  billingCity: string,
  billingCountry: string,
  billingDefault: boolean,
  billingPostalCode: string,
  billingStreet: string,
  shippingCity: string,
  shippingCountry: string,
  shippingDefault: boolean,
  shippingPostalCode: string,
  shippingStreet: string,
) {
  const myHeaders = new Headers();
  const adminToken = await getAdminToken();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${adminToken}`);

  const raw: RawData = {
    email,
    firstName,
    lastName,
    password,
    addresses: [
      {
        country: billingCountry,
        city: billingCity,
        postalCode: billingPostalCode,
        streetName: billingStreet,
      },
      {
        country: shippingCountry,
        city: shippingCity,
        postalCode: shippingPostalCode,
        streetName: shippingStreet,
      },
    ],
    billingAddresses: [0],
    shippingAddresses: [1],
  };

  if (billingDefault) {
    raw.defaultBillingAddress = 0;
  }
  if (shippingDefault) {
    raw.defaultShippingAddress = 1;
  }

  const jsonString = JSON.stringify(raw);

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: jsonString,
    redirect: 'follow',
  };

  return fetch(
    'https://api.europe-west1.gcp.commercetools.com/doomsday-store/customers',
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error: Error) => error.message);
}
