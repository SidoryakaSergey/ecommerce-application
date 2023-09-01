import { Controller, useFormContext } from 'react-hook-form';

function CheckboxAdress(props: { name: string; defaultValue: boolean }): JSX.Element {
  const { control } = useFormContext();
  const { name, defaultValue } = props;
  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="flex items-center">
            <label className="pl-5 text-sm">Set as default address</label>
            <input
              type="checkbox"
              className="absolute w-4 h-4 bg-white rounded-full appearance-none cursor-pointer"
              checked={field.value as boolean}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          </div>
        )}
      />
    </div>
  );
}

export default CheckboxAdress;
