import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'

interface FormInputProps {
  name: string
  label: string
  control: Control<any>
  value?: string
  errors: FieldErrors<any>
  rules?: object
  placeholder?: string
}

export const FormInput = ({
  name,
  label,
  control,
  value = '',
  errors,
  rules = {},
  placeholder = '',
}: FormInputProps) => {
  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={value}
        render={({ field }) => (
          <InputText
            id={name}
            {...field}
            placeholder={placeholder}
            invalid={errors[name] !== undefined}
          />
        )}
      />
      <small className="p-error" hidden={errors[name] === undefined}>
        {errors[name]?.message as string}
      </small>
    </div>
  )
}
