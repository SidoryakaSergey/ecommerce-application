import { Controller, useFormContext } from 'react-hook-form';

// const countries = ['UA', 'RU', 'BY', 'PL', 'KZ'];

const postalCodeRegex: { [country: string]: RegExp } = {
  UA: /^\d{5}$/,
  RU: /^\d{6}$/,
  BY: /^\d{6}$/,
  PL: /^\d{5}$/,
  KZ: /^\d{6}$/,
};

type InputPostalCodeProps = {
  name: string;
  defaultPostalCode: string;
  selectedCountry: string;
  disabled?: boolean;
};

function InputPostalCode(props: InputPostalCodeProps): JSX.Element {
  const { control } = useFormContext();
  const { name, defaultPostalCode, selectedCountry, disabled } = props;
  const inputClasses = `w-full p-2 border border-gray-300 rounded ${
    disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
  }`;
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Postal code*</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultPostalCode}
        rules={{
          required: 'Postal code is required',
          pattern: selectedCountry
            ? {
                value: postalCodeRegex[selectedCountry],
                message: 'Invalid postal code',
              }
            : undefined,
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

export default InputPostalCode;
