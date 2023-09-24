import getAdminToken from './getAdminToken.ts';
import { UserInfo } from '../interfaces/UserData.ts';
import RawData from '../interfaces/UserFormI.ts';

export default async function updateCustomer(
  id: string,
  version: number,
  userData: UserInfo,
  billingId: string,
  shippingId: string,
) {
  const myHeaders = new Headers();
  const adminToken = await getAdminToken();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${adminToken}`);

  const raw: RawData = {
    version,
    actions: [
      {
        action: 'changeEmail',
        email: userData.email,
      },
      {
        action: 'setFirstName',
        firstName: userData.firstName,
      },
      {
        action: 'setLastName',
        lastName: userData.lastName,
      },
      {
        action: 'changeAddress',
        addressId: shippingId,
        address: {
          streetName: userData.shippingStreet,
          postalCode: userData.shippingPostalCode,
          city: userData.shippingCity,
          country: userData.shippingCountry,
        },
      },
      {
        action: 'changeAddress',
        addressId: billingId,
        address: {
          streetName: userData.billingStreet,
          postalCode: userData.billingPostalCode,
          city: userData.billingCity,
          country: userData.billingCountry,
        },
      },
    ],
  };

  if (userData.shippingDefault) {
    raw.actions.push({
      action: 'setDefaultShippingAddress',
      addressId: shippingId,
    });
  }

  if (userData.billingDefault) {
    raw.actions.push({
      action: 'setDefaultBillingAddress',
      addressId: billingId,
    });
  }

  const jsonString = JSON.stringify(raw);

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: jsonString,
    redirect: 'follow',
  };

  return fetch(
    `https://api.europe-west1.gcp.commercetools.com/doomsday-store/customers/${id}`,
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
