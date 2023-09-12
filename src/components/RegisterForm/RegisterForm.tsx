import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { showErrorToastMessage, showSuccessToastMessage } from '../../utils/toastFuncs.tsx';

import registerCustomer from '../../fetchs/registerCustomer.ts';
import 'react-toastify/dist/ReactToastify.css';

import { InputText, InputMail, InputPassword, InputPostalCode } from '../UI/Inputs';
import CheckboxAdress from '../UI/Checkbocks/CheckboxAdress.tsx';
import SelectCountry from '../UI/Selects/SelectCountry.tsx';
import tryToGetToken from '../../fetchs/getToken.ts';
import createCart from '../../fetchs/createCart.ts';
import Cart from '../../interfaces/cart.ts';

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

const RegistrationForm = () => {
  const navigate = useNavigate();

  const methods = useForm<RegistrationFormValues>({
    mode: 'onBlur',
  });
  const { handleSubmit, formState } = methods;

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

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      const result = await registerCustomer(
        data.email,
        data.firstName,
        data.lastName,
        data.password,
        data.billingCity,
        data.billingCountry,
        data.billingDefault,
        data.billingPostalCode,
        data.billingStreet,
        data.shippingCity,
        data.shippingCountry,
        data.shippingDefault,
        data.shippingPostalCode,
        data.shippingStreet,
      );
      const tokenResult = await tryToGetToken(data.email, data.password);
      await createCart(tokenResult.access_token).then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const cartdata: Cart = JSON.parse(response);
        localStorage.setItem('cartId', cartdata.id);
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const responseData = JSON.parse(result);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (responseData.customer) {
        showSuccessToastMessage('Successful!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
        return result;
      }
      return result;
    } catch (error) {
      showErrorToastMessage('Ошибка при создании пользователя');
      return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Registration form</h2>
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <FormProvider {...methods}>
          <InputText name="firstName" title="First name" defaultText="" />
          <InputText name="lastName" title="Last name" defaultText="" />
          <InputMail email="" />
          <InputPassword password="" />
          <div className="flex justify-center">
            <h2>Billing Adress</h2>
          </div>
          <SelectCountry
            name="billingCountry"
            defaultCountry=""
            onCountryChange={handleBillingCountryChange}
          />
          <InputPostalCode
            name="billingPostalCode"
            defaultPostalCode=""
            selectedCountry={selectedBillingCountry}
          />
          <InputText name="billingCity" title="City" defaultText="" />
          <InputText name="billingStreet" title="Street and Appartment" defaultText="" />
          <CheckboxAdress name="billingDefault" defaultValue={false} />
          <div className="flex justify-center">
            <h2>Shipping Adress</h2>
          </div>
          <SelectCountry
            name="shippingCountry"
            defaultCountry=""
            onCountryChange={handleShippingCountryChange}
          />
          <InputPostalCode
            name="shippingPostalCode"
            defaultPostalCode=""
            selectedCountry={selectedShippingCountry}
          />
          <InputText name="shippingCity" title="City" defaultText="" />
          <InputText name="shippingStreet" title="Street and Appartment" defaultText="" />
          <CheckboxAdress name="shippingDefault" defaultValue={false} />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            type="submit"
            disabled={formState.isSubmitting}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </button>
        </FormProvider>
      </div>
      <br />
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <NavLink
          to="/login"
          className="text-white font-semibold text-lg hover:opacity-75 transition duration-300"
        >
          <button
            className="w-full bg-green-500 text-blue p-2 rounded hover:bg-green-600"
            type="button"
          >
            Login
          </button>
        </NavLink>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
