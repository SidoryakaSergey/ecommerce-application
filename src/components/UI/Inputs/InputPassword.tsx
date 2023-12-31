import { Controller, useFormContext } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

function InputPassword(props: { password: string; disabled?: boolean }): JSX.Element {
  const { control } = useFormContext();
  const { password, disabled } = props;
  const [showPassword, setShowPassword] = useState(false);
  const inputClasses = `border rounded p-2 mr-2 border-gray-300 ${
    disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
  }`;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Password*</label>
      <Controller
        name="password"
        control={control}
        defaultValue={password}
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
                className={inputClasses}
                type={showPassword ? 'text' : 'password'}
                {...field}
                disabled={disabled}
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
            {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
          </div>
        )}
      />
    </div>
  );
}

export default InputPassword;
