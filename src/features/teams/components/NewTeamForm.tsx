import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
// import type { TeamType } from '../types/teamType'
import type { InsertTeamType } from '../types/insertTeamType'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import type { AreasType } from '../types/areasType'
import type { CentersType } from '../types/centersType'
import { FormDropdown } from '../../../shared/components/form/FormDropdown'
import { FormMultiSelect } from '../../../shared/components/form/FormMultiSelect'

interface NewTeamFormProps {
  areas: AreasType[]
  centers: CentersType[]
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: any) => Promise<void>
}

export const NewTeamForm = ({
  areas,
  centers,
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewTeamFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<InsertTeamType>({
    mode: 'onBlur',
  })

  const onSubmitNewProduct = async (data: InsertTeamType) => {
    await onSubmit(data)
    reset()
  }

  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null)

  // const perfiles = [
  //   { name: 'Admin', extra: 'admin' },
  //   { name: 'Editor', extra: 'editor' },
  //   { name: 'Viewer', extra: 'viewer' },
  // ]
  return (
    <Dialog
      header="Agregar Equipo"
      visible={isModalOpen}
      maximizable
      style={{ width: '35vw' }}
      onHide={() => {
        if (!isModalOpen) return
        onIsModalOpen(false)
      }}
    >
      <form onSubmit={handleSubmit(onSubmitNewProduct)}>
        <FormInput
          name="nombre"
          label="Nombre:"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese nombre del equipo' }}
        />

        <FormInput
          name="correo"
          label="Correo"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese correo del equipo' }}
        />
        <FormInput
          name="descripcion"
          label="Descripción"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese la descripción' }}
        />
        <div className="col-4 flex align-items-center p-mb-2">Gerencia:</div>
        <FormDropdown
          name="areaId"
          label="Area"
          control={control}
          errors={errors}
          options={areas?.map((area) => ({
            label: area.name,
            value: area.id,
          }))}
          rules={{ required: 'Defina Area' }}
          placeholder="Seleccione un Area"
        />
        <FormMultiSelect
          name="zonaId"
          label="Zonas"
          control={control}
          errors={errors}
          options={areas?.map((area) => ({
            label: area.name,
            value: area.id,
          }))}
          rules={{ required: 'Defina Zona' }}
          placeholder="Seleccione una Zona"
        />

        <div className="col-4 flex align-items-center p-mb-2">
          Centro de Servicio:
        </div>
        <div className="col-8" style={{ width: '100%' }}>
          <Dropdown
            value={selectedCenter}
            options={centers?.map((center) => ({
              label: center.name,
              value: center.id,
            }))}
            onChange={(e) => setSelectedCenter(e.value)}
            placeholder="Seleccione"
            className="p-dropdown-sm"
            style={{ width: '100%' }}
          />
        </div>
        <div
          className="flex justify-content-center gap-4"
          style={{ marginTop: '20px' }}
        >
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            outlined
            onClick={() => onIsModalOpen(false)}
          />
          <Button
            disabled={!isValid || isSubmitting}
            label="Agregar"
            type="submit"
            icon="pi pi-plus"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
