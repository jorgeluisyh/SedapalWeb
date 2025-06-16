import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { InputTextarea } from 'primereact/inputtextarea'

interface FormTextAreaProps {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  rules?: object
  placeholder?: string
  rows?: number
}

export const FormTextArea = ({
  name,
  label,
  control,
  errors,
  rules = {},
  placeholder = '',
  rows = 3,
}: FormTextAreaProps) => {
  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputTextarea
            id={name}
            {...field}
            placeholder={placeholder}
            rows={rows}
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
