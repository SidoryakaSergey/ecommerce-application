import { Controller, useFormContext } from 'react-hook-form';

function InputMail(props: { email: string }): JSX.Element {
  const { control } = useFormContext();
  const { email } = props;
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
            <input className="w-full p-2 border border-gray-300 rounded" type="text" {...field} />
            {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
          </div>
        )}
      />
    </div>
  );
}

export default InputMail;
