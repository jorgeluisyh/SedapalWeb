import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Calendar } from 'primereact/calendar'

interface FormDatePickerProps {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  rules?: object
  placeholder?: string
  showTime?: boolean
}

export const FormDatePicker = ({
  name,
  label,
  control,
  errors,
  rules = {},
  placeholder = '',
  showTime = false,
}: FormDatePickerProps) => {
  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Calendar
            id={name}
            {...field}
            placeholder={placeholder}
            showTime={showTime}
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
