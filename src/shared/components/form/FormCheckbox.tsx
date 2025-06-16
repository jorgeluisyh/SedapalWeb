import { Controller, Control, FieldErrors } from 'react-hook-form'
import { Checkbox } from 'primereact/checkbox'

interface FormCheckboxProps {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  rules?: object
}

export const FormCheckbox = ({
  name,
  label,
  control,
  errors,
  rules = {},
}: FormCheckboxProps) => {
  return (
    <div className="flex align-items-center mb-4">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange, ...rest } }) => (
          <Checkbox
            id={name}
            inputId={name}
            checked={value}
            onChange={(e) => onChange(e.checked)}
            {...rest}
            className={errors[name] ? 'p-invalid' : ''}
          />
        )}
      />
      <label htmlFor={name} className="ml-2">
        {label}
      </label>
      <small className="p-error ml-2" hidden={errors[name] === undefined}>
        {errors[name]?.message as string}
      </small>
    </div>
  )
}
