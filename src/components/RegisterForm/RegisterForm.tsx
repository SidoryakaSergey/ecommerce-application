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
      <h2 className="text-2xl font-semibold mb-4">Welcom</h2>
      <form className="w-full max-w-sm bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First name*
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="firstName"
            value={firsName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last name*
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="test"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email*
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password*
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Register
        </button>
        <p className="text-gray text-sm italic">* mandatory field</p>
      </form>
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
}

export default RegisterForm;
