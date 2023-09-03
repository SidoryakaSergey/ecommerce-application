import getAdminToken from './getAdminToken';
import UserData from '../interfaces/UserData';

export default async function getDataCustomer(id: string): Promise<UserData> {
  const myHeaders = new Headers();
  const adminToken = await getAdminToken();
  myHeaders.append('Authorization', `Bearer ${adminToken}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/doomsday-store/customers/${id}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error('Ошибка при получении пользователя');
    }

    const userData: UserData = (await response.json()) as UserData;
    return userData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Неизвестная ошибка');
  }
}
