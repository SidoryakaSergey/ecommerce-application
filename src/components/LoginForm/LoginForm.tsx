import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showErrorToastMessage, showSuccessToastMessage } from '../../utils/toastFuncs.tsx';

import tryToGetToken from '../../fetchs/getToken.ts';
import loginUser from '../../fetchs/loginCustomer.ts';

import { InputMail, InputPassword } from '../UI/Inputs';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const methods = useForm<FormValues>({
    mode: 'onBlur',
  });
  const { handleSubmit, formState } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    tryToGetToken(data.email, data.password)
      .then((response) => {
        let token: string = '';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (typeof response !== 'string' && 'access_token' in response) {
          token = response.access_token;
          loginUser(data.email, data.password, token);
          showSuccessToastMessage();
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }

        return token;
      })
      .catch((error) => {
        if (error instanceof Error) {
          showErrorToastMessage(error.message);
        }
      });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Welcom</h2>
        <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <InputMail email="" />
          <InputPassword password="" />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            type="submit"
            disabled={formState.isSubmitting}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit(onSubmit)}
          >
            Log In
          </button>
          <p className="text-gray text-sm italic">* mandatory field</p>
        </div>
        <br />

        <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
          <NavLink
            to="/register"
            className="text-white font-semibold text-lg hover:opacity-75 transition duration-300"
          >
            <button
              className="w-full bg-green-500 text-blue p-2 rounded hover:bg-green-600"
              type="button"
            >
              Register
            </button>
          </NavLink>
        </div>
        <ToastContainer />
      </div>
    </FormProvider>
  );
}

export default LoginForm;
