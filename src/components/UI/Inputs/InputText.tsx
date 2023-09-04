import { Controller, useFormContext } from 'react-hook-form';

function InputText(props: {
  name: string;
  title: string;
  defaultText: string;
  disabled?: boolean;
}): JSX.Element {
  const { control } = useFormContext();
  const { name, title, defaultText, disabled } = props;

  const inputClasses = `w-full p-2 border border-gray-300 rounded ${
    disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
  }`;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{title}*</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultText}
        rules={{
          required: `${title} is required`,
          minLength: { value: 1, message: 'At least one character is required' },
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

export default InputText;
