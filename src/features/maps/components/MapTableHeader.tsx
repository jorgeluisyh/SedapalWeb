import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { type ChangeEvent } from 'react'

interface MapTableHeaderProps {
  globalFilterValue: string
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  onAddClick: () => void
}

export const MapTableHeader = ({
  globalFilterValue,
  onGlobalFilterChange,
  onAddClick,
}: MapTableHeaderProps) => {
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
      <Button
        onClick={onAddClick}
        type="button"
        icon="pi pi-plus"
        label="Agregar Mapas"
      />
    </div>
  )
}
