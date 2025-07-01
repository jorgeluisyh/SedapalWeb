import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'

interface FormInputProps {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  rules?: object
  placeholder?: string
  hidden?: boolean
}

export const FormInput = ({
  name,
  label,
  control,
  errors,
  rules = {},
  placeholder = '',
  hidden = false,
}: FormInputProps) => {
  return (
    <div className={hidden ? 'hidden' : 'flex flex-column gap-2 mb-4'}>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputText
            className="p-inputtext-sm"
            autoComplete="off"
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
