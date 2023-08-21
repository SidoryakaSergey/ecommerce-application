import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import registerCustomer from '../../fetchs/registerCustomer.ts';

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

const countries = ['Ukraine', 'Russia', 'Belarus', 'Poland', 'Kazakhstan'];

const postalCodeRegex: { [country: string]: RegExp } = {
  Ukraine: /^\d{5}$/,
  Russia: /^\d{6}$/,
  Belarus: /^\d{6}$/,
  Poland: /^\d{5}$/,
  Kazakhstan: /^\d{6}$/,
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState, watch } = useForm<RegistrationFormValues>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await registerCustomer(data.email, data.firstName, data.lastName, data.password).then(
      (result) => {
        navigate('/');
        return result;
      },
    );
  };

  const selectedBillingCountry = watch('billingCountry');
  const postalCodePatternBilling = selectedBillingCountry
    ? postalCodeRegex[selectedBillingCountry]
    : undefined;
  const selectedShippingCountry = watch('shippingCountry');
  const postalCodePatternShipping = selectedShippingCountry
    ? postalCodeRegex[selectedShippingCountry]
    : undefined;

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Registration form</h2>
      <form
        className="w-full max-w-sm bg-white p-8 rounded shadow-md"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ************ First name *************************** */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name*</label>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{
              required: 'First name is required',
              minLength: { value: 1, message: 'At least one character is required' },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* *************** last name************************ */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name*</label>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{
              required: 'Last name is required',
              minLength: { value: 1, message: 'At least one character is required' },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ***************** Email ********************** */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email*</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message:
                  'Invalid email address, The email address should be include a domain name and use @',
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ***************** Password ********************** */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password*
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                message:
                  'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />

                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex justify-center">
          <h2>Billing Adress</h2>
        </div>
        {/* *************** Country ********** */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Country*</label>
          <Controller
            name="billingCountry"
            control={control}
            defaultValue=""
            rules={{ required: 'Country is required' }}
            render={({ field, fieldState }) => (
              <div>
                <select
                  className="w-full h-8 p-1 border text-sm border-gray-300 rounded"
                  {...field}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ************* Postal code ************ */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code*</label>
          <Controller
            name="billingPostalCode"
            control={control}
            defaultValue=""
            rules={{
              required: 'Postal code is required',
              pattern: postalCodePatternBilling
                ? {
                    value: postalCodePatternBilling,
                    message: 'Invalid postal code',
                  }
                : undefined,
            }}
            render={({ field, fieldState }) => (
              <div className="mb-4">
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* **************** City ********************* */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City*</label>
          <Controller
            name="billingCity"
            control={control}
            defaultValue=""
            rules={{
              required: 'City is required',
              minLength: { value: 1, message: 'At least one character is required' },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ******************* Street *************** */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Street and Appartment*
          </label>
          <Controller
            name="billingStreet"
            control={control}
            defaultValue=""
            rules={{
              required: 'Street is required',
              minLength: { value: 1, message: 'At least one character is required' },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ******** Radio btn *************** */}
        <div className="mb-4">
          <Controller
            name="billingDefault"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="pl-5 text-sm">Set as default address</label>
                <input
                  type="checkbox"
                  className="absolute w-4 h-4 bg-white rounded-full appearance-none cursor-pointer"
                  checked={field.value}
                  onChange={() => field.onChange(!field.value)}
                />
              </div>
            )}
          />
        </div>
        {/* ************************  Shipping Adress ************************ */}
        <div className="flex justify-center">
          <h2>Shipping Adress</h2>
        </div>
        {/* *************** Country ********** */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Country*</label>
          <Controller
            name="shippingCountry"
            control={control}
            defaultValue=""
            rules={{ required: 'Country is required' }}
            render={({ field, fieldState }) => (
              <div>
                <select
                  className="w-full h-8 p-1 border text-sm border-gray-300 rounded"
                  {...field}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ************* Postal code ************ */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code*</label>
          <Controller
            name="shippingPostalCode"
            control={control}
            defaultValue=""
            rules={{
              required: 'Postal code is required',
              pattern: postalCodePatternShipping
                ? {
                    value: postalCodePatternShipping,
                    message: 'Invalid postal code',
                  }
                : undefined,
            }}
            render={({ field, fieldState }) => (
              <div className="mb-4">
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* **************** City ********************* */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City*</label>
          <Controller
            name="shippingCity"
            control={control}
            defaultValue=""
            rules={{
              required: 'City is required',
              minLength: { value: 1, message: 'At least one character is required' },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ******************* Street *************** */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Street and Appartment*
          </label>
          <Controller
            name="shippingStreet"
            control={control}
            defaultValue=""
            rules={{
              required: 'Street is required',
              minLength: { value: 1, message: 'At least one character is required' },
            }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  className="w-full h-6 p-2 border border-gray-300 rounded"
                  type="text"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ******** Radio btn *************** */}
        <div className="mb-4">
          <Controller
            name="shippingDefault"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="pl-5 text-sm">Set as default address</label>
                <input
                  type="checkbox"
                  className="absolute w-4 h-4 bg-white rounded-full appearance-none cursor-pointer"
                  checked={field.value}
                  onChange={() => field.onChange(!field.value)}
                />
              </div>
            )}
          />
        </div>
        {/* ************************* Submit btn *********************** */}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Submit
        </button>
        <p className="text-gray text-sm italic">* mandatory field</p>
      </form>
      {/* ********************** Login page btn*************************************** */}
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
    </div>
  );
};

export default RegistrationForm;
