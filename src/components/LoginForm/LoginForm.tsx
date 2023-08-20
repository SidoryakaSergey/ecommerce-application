/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import tryToGetToken from '../../fetchs/getToken.ts';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const { control, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    tryToGetToken(data.email, data.password)
      .then((response) => {
        let token: string;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (typeof response !== 'string' && 'access_token' in response) {
          token = response.access_token;
          console.log(token);
        }
      })
      .catch((error) => {
        console.log('Произошла ошибка:', error);
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
                message: 'Invalid email address',
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
                  <span className="text-red-500">{fieldState.error.message}</span>
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
                message: 'Invalid password format',
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
                    onClick={() => setShowPassword(!showPassword)}
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
                  <span className="text-red-500">{fieldState.error.message}</span>
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
    </div>
  );
}

export default LoginForm;
