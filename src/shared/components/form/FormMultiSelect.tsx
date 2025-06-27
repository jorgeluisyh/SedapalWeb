import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { MultiSelect } from 'primereact/multiselect'

interface Option {
  label: string
  value: any
}

interface FormMultiSelectProps {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  options: Option[]
  rules?: object
  placeholder?: string
  maxSelectedLabels?: number
}

export const FormMultiSelect = ({
  name,
  label,
  control,
  errors,
  options,
  rules = {},
  placeholder = '',
  maxSelectedLabels = 3,
}: FormMultiSelectProps) => {
  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <MultiSelect
            id={name}
            {...field}
            options={options}
            placeholder={placeholder}
            value={field.value || []} // Handle selected values
            onChange={(e) => field.onChange(e.value)} // Update the selected values
            className={errors[name] ? 'p-invalid' : ''}
            filter
            optionLabel="label"
            optionValue="value"
            maxSelectedLabels={maxSelectedLabels} // Limit the number of selected labels to show
          />
        )}
      />
      <small className="p-error" hidden={errors[name] === undefined}>
        {errors[name]?.message as string}
      </small>
    </div>
  )
}
