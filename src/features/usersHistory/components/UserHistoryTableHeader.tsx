import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { type ChangeEvent } from 'react'

interface Props {
  globalFilterValue: string
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  onAddClick: () => void
}

export const UserHistoryTableHeader = ({
  globalFilterValue,
  onGlobalFilterChange,
}: Props) => {
  return (
    <div className="flex justify-content-between">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Palabra clave"
        />
      </IconField>
    </div>
  )
}
