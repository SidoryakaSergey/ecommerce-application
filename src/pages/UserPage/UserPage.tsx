import { useState, useEffect } from 'react';

import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { showErrorToastMessage, showSuccessToastMessage } from '../../utils/toastFuncs.tsx';
import 'react-toastify/dist/ReactToastify.css';

import { InputText, InputMail, InputPostalCode } from '../../components/UI/Inputs';
import CheckboxAdress from '../../components/UI/Checkbocks/CheckboxAdress.tsx';
import SelectCountry from '../../components/UI/Selects/SelectCountry.tsx';

import UserData, { UserInfo } from '../../interfaces/UserData.ts';
import getDataCustomer from '../../fetchs/getDataCustomer.ts';

import { getLocalStorage } from '../../utils/localStorageFuncs.ts';
import updateCustomer from '../../fetchs/updateCustomer.ts';

type RegistrationFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  billingDefault: boolean;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingDefault: boolean;
};

interface TypeSelectedCountry {
  selectedCountry: string;
}

function UserPage() {
  const methods = useForm<RegistrationFormValues>({
    mode: 'onBlur',
  });
  const { handleSubmit, formState } = methods;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    getDataCustomer(getLocalStorage('bearID'))
      .then((response) => {
        setUserData(response);
      })
      .catch(() => {
        showErrorToastMessage('Нет данных пользователя');
      });
  }, []);

  const [selectedBillingCountry, setSelectedBillingCountry] =
    useState<TypeSelectedCountry['selectedCountry']>('');

  const handleBillingCountryChange = (country: string) => {
    setSelectedBillingCountry(country);
  };

  const [selectedShippingCountry, setSelectedShippingCountry] =
    useState<TypeSelectedCountry['selectedCountry']>('');

  const handleShippingCountryChange = (country: string) => {
    setSelectedShippingCountry(country);
  };

  const onSubmit = (userInfoData: UserInfo) => {
    let shippingId: string;
    let billingId: string;
    let userId: string;
    let userVersion: number;
    if (userData) {
      billingId = userData.addresses[1].id;
      shippingId = userData.addresses[0].id;
      userId = userData.id;
      userVersion = userData.version;
      setDisabled(true);
      // eslint-disable-next-line no-void
      void updateCustomer(userId, userVersion, userInfoData, billingId, shippingId).then(
        (response: UserData) => {
          showSuccessToastMessage('Saved!');
          setUserData(response);
        },
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <FormProvider {...methods}>
          {disabled ? (
            <button
              className="w-full bg-blue-500 text-white p-2 mb-3 rounded hover:bg-blue-600"
              disabled={formState.isSubmitting}
              onClick={() => setDisabled(false)}
            >
              Edit
            </button>
          ) : (
            ''
          )}
          {userData ? (
            <>
              <InputText
                name="firstName"
                title="First name"
                defaultText={userData.firstName}
                disabled={disabled}
              />
              <InputText
                name="lastName"
                title="Last name"
                defaultText={userData.lastName}
                disabled={disabled}
              />
              <InputMail email={userData.email} disabled={disabled} />
              <div className="flex justify-center">
                <h2>Billing Adress</h2>
              </div>
              <SelectCountry
                name="billingCountry"
                defaultCountry={userData.addresses[0].country}
                onCountryChange={handleBillingCountryChange}
                disabled={disabled}
              />
              <InputPostalCode
                name="billingPostalCode"
                defaultPostalCode={userData.addresses[0].postalCode}
                selectedCountry={selectedBillingCountry}
                disabled={disabled}
              />
              <InputText
                name="billingCity"
                title="City"
                defaultText={userData.addresses[0].city}
                disabled={disabled}
              />
              <InputText
                name="billingStreet"
                title="Street and Appartment"
                defaultText={userData.addresses[0].streetName}
                disabled={disabled}
              />
              <CheckboxAdress
                name="billingDefault"
                defaultValue={Boolean(userData.defaultBillingAddressId)}
                disabled={disabled}
              />
              <div className="flex justify-center">
                <h2>Shipping Adress</h2>
              </div>
              <SelectCountry
                name="shippingCountry"
                defaultCountry={userData.addresses[1].country}
                onCountryChange={handleShippingCountryChange}
                disabled={disabled}
              />
              <InputPostalCode
                name="shippingPostalCode"
                defaultPostalCode={userData.addresses[1].postalCode}
                selectedCountry={selectedShippingCountry}
                disabled={disabled}
              />
              <InputText
                name="shippingCity"
                title="City"
                defaultText={userData.addresses[1].city}
                disabled={disabled}
              />
              <InputText
                name="shippingStreet"
                title="Street and Appartment"
                defaultText={userData.addresses[1].streetName}
                disabled={disabled}
              />
              <CheckboxAdress
                name="shippingDefault"
                defaultValue={Boolean(userData.defaultShippingAddressId)}
                disabled={disabled}
              />
            </>
          ) : (
            <p>Loading user data ...</p>
          )}
          {!disabled ? (
            <div className="">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 mr-3 rounded hover:bg-blue-600"
                disabled={formState.isSubmitting}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSubmit(onSubmit)}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white p-2 mb-3 rounded hover:bg-blue-600"
                onClick={() => setDisabled(true)}
              >
                Cancel
              </button>
            </div>
          ) : (
            ''
          )}
        </FormProvider>
      </div>

      <ToastContainer />
    </div>
  );
}

export default UserPage;
