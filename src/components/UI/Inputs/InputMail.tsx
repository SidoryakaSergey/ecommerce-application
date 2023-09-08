import { Controller, useFormContext } from 'react-hook-form';

function InputMail(props: { email: string; disabled?: boolean }): JSX.Element {
  const { control } = useFormContext();
  const { email, disabled } = props;
  const inputClasses = `w-full p-2 border border-gray-300 rounded ${
    disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
  }`;
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email*</label>
      <Controller
        name="email"
        control={control}
        defaultValue={email}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field, fieldState }) => (
          <div>
            <input className={inputClasses} type="text" {...field} disabled={disabled} />
            {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
          </div>
        )}
      />
    </div>
  );
}

export default InputMail;
