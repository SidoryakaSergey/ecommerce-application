import { Controller, useFormContext } from 'react-hook-form';

function InputText(props: { name: string; title: string; defaultText: string }): JSX.Element {
  const { control } = useFormContext();
  const { name, title, defaultText } = props;
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
            <input className="w-full p-2 border border-gray-300 rounded" type="text" {...field} />
            {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
          </div>
        )}
      />
    </div>
  );
}

export default InputText;
