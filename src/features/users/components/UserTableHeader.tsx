import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { type ChangeEvent } from 'react'

interface UserTableHeaderProps {
  globalFilterValue: string
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  onAddClick: () => void
  onAddExternalClick?: () => void
  onEditMultipleUsersClick?: () => void
}

export const UserTableHeader = ({
  globalFilterValue,
  onGlobalFilterChange,
  onAddClick,
  onAddExternalClick,
  onEditMultipleUsersClick,
}: UserTableHeaderProps) => {
  return (
    <div className="flex flex-column md:flex-row justify-content-between gap-2">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          className="p-inputtext-sm"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Palabra clave"
        />
      </IconField>
      {/* </div> */}
      <div className="flex flex-wrap gap-2 justify-content-end mt-2">
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
          onClick={onEditMultipleUsersClick}
          type="button"
          icon="pi pi-plus"
          label="Editar Multiples Usuarios"
          className="p-button-sm w-full md:w-auto"
        />
      </div>
    </div>
  )
}
