import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'

interface Option {
  label: string
  value: any
}

interface FormDropdownProps {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  options: Option[]
  rules?: object
  placeholder?: string
}

export const FormDropdown = ({
  name,
  label,
  control,
  errors,
  options,
  rules = {},
  placeholder = '',
}: FormDropdownProps) => {
  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        // defaultValue={value}
        render={({ field }) => (
          <Dropdown
            id={name}
            {...field}
            options={options}
            placeholder={placeholder}
            className={errors[name] ? 'p-invalid' : ''}
          />
        )}
      />
      <small className="p-error" hidden={errors[name] === undefined}>
        {errors[name]?.message as string}
      </small>
    </div>
  )
}
