import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { type ChangeEvent } from 'react'

interface Props {
  globalFilterValue: string
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  onAddClick: () => void
  onAddExternalClick?: () => void
  onAddMultipleClick?: () => void
}

export const UserTableHeader = ({
  globalFilterValue,
  onGlobalFilterChange,
  onAddClick,
  onAddExternalClick,
  onAddMultipleClick,
}: Props) => {
  return (
    <div className="flex flex-column md:flex-row justify-content-between gap-2">
      {/* <div className="flex justify-content-between"> */}
      <div className="flex flex-wrap gap-2 justify-content-end mt-2">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Palabra clave"
          />
        </IconField>
        {/* </div> */}
        <Button
          onClick={onAddClick}
          type="button"
          icon="pi pi-plus"
          label="Agregar Usuario LDAP"
          className="p-button-sm w-full md:w-auto"
        />
        <Button
          onClick={onAddExternalClick}
          type="button"
          icon="pi pi-plus"
          label="Agregar Usuario Externo"
          className="p-button-sm w-full md:w-auto"
        />
        <Button
          onClick={onAddMultipleClick}
          type="button"
          icon="pi pi-plus"
          label="Editar Multiples Usuarios"
          className="p-button-sm w-full md:w-auto"
        />
      </div>
    </div>
  )
}
