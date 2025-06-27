import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'

interface Option {
  label: string
  value: any
}

interface FormDropdownMultipleProps {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  options: Option[]
  rules?: object
  placeholder?: string
}

export const FormDropdownMultiple = ({
  name,
  label,
  control,
  errors,
  options,
  rules = {},
  placeholder = '',
}: FormDropdownMultipleProps) => {
  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Dropdown
            id={name}
            {...field}
            options={options}
            placeholder={placeholder}
            value={field.value || []} // Handle selected values
            onChange={(e) => field.onChange(e.value)} // Update the selected values
            className={errors[name] ? 'p-invalid' : ''}
            multiple // Enable multi-selection
            filter
            filterBy="label"
            optionLabel="label"
            optionValue="value"
          />
        )}
      />
      <small className="p-error" hidden={errors[name] === undefined}>
        {errors[name]?.message as string}
      </small>
    </div>
  )
}
