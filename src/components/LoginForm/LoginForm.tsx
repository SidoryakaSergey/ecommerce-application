/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import tryToGetToken from '../../fetchs/getToken.ts';
import loginUser from '../../fetchs/loginCustomer.ts';

type FormValues = {
  email: string;
  password: string;
};

const showSuccessToastMessage = () => {
  toast.success('You have successfully logged!', {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const showErrorToastMessage = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

function LoginForm() {
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    tryToGetToken(data.email, data.password)
      .then((response) => {
        let token: string = '';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (typeof response !== 'string' && 'access_token' in response) {
          token = response.access_token;
          loginUser(data.email, data.password, token);
          navigate('/');
        }

        showSuccessToastMessage();

        return token;
      })
      .catch((error) => {
        if (error instanceof Error) {
          showErrorToastMessage(error.message);
        }
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Welcom</h2>
      <form
        className="w-full max-w-sm bg-white p-8 rounded shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email*
          </label>
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
                  className="w-full p-2 border border-gray-300 rounded"
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
        {/* ********* */}
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
                <div className="flex items-center">
                  <input
                    className="border rounded p-2 mr-2"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    className="bg-gray-300 p-2 rounded"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-6 w-6" />
                    ) : (
                      <EyeIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
                {fieldState.error && (
                  <span className="text-sm text-red-500">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        {/* ************* */}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Log In
        </button>
        <p className="text-gray text-sm italic">* mandatory field</p>
      </form>
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
  );
}

export default LoginForm;
