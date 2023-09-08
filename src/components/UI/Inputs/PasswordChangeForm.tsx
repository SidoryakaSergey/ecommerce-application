/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface PasswordChangeFormProps {
  onSubmit: SubmitHandler<{ oldPassword: string; newPassword: string }>;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<{ oldPassword: string; newPassword: string }>({
    mode: 'onBlur',
  });

  const [disabled, setDisabled] = useState(true);
  const inputClasses = `w-full p-2 border border-gray-300 rounded ${
    disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
  }`;
  return (
    <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
          Old Password
        </label>
        <Controller
          name="oldPassword"
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
                <input className={inputClasses} type="text" {...field} disabled={disabled} />
              </div>
              {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
            </div>
          )}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
          New Password
        </label>
        <Controller
          name="newPassword"
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
                <input className={inputClasses} type="text" {...field} disabled={disabled} />
              </div>
              {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
            </div>
          )}
        />
        <div className="flex justify-between">
          <button
            className={`mt-5 p-2 rounded ${
              disabled
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed w-full mr-2'
                : 'bg-green-500 text-white hover:bg-green-600 w-full mr-2'
            }`}
            type="submit"
            disabled={disabled}
          >
            Change Password
          </button>
          <button
            type="button"
            className="mt-5 w-full bg-green-500 text-blue p-2 rounded hover:bg-green-600"
            onClick={() => setDisabled(!disabled)}
          >
            {disabled ? 'Edit Password' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
