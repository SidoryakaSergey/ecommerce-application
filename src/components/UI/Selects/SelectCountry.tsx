import { Controller, useFormContext } from 'react-hook-form';

const countries = ['UA', 'RU', 'BY', 'PL', 'KZ'];

type InputCountryProps = {
  name: string;
  defaultCountry: string;
  onCountryChange: (country: string) => void;
};

function SelectCountry(props: InputCountryProps): JSX.Element {
  const { control } = useFormContext();
  const { name, defaultCountry, onCountryChange } = props;

  const handleCountryChange = (country: string) => {
    const selectedCountry = country;
    onCountryChange(selectedCountry);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Country*</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultCountry}
        rules={{ required: 'Country is required' }}
        render={({ field, fieldState }) => (
          <div>
            <select
              className="w-full h-8 p-1 border text-sm border-gray-300 rounded"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleCountryChange(e.target.value);
              }}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <span className="text-sm text-red-500">{fieldState.error.message}</span>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default SelectCountry;
