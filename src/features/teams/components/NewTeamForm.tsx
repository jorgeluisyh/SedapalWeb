import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { TeamType } from '../types/teamType'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import type { AreasType } from '../types/areasType'
import type { CentersType } from '../types/centersType'

interface NewTeamFormProps {
  areas: AreasType[] | null
  centers: CentersType[] | null
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: TeamType) => Promise<void>
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
  } = useForm<TeamType>({
    mode: 'onBlur',
  })

  const onSubmitNewProduct = async (data: TeamType) => {
    await onSubmit(data)
    reset()
  }

  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)

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
        <div className="col-8" style={{ width: '100%' }}>
          <Dropdown
            value={selectedPerfil}
            options={areas?.map((area) => ({
              label: area.name,
              value: area.id,
            }))}
            onChange={(e) => setSelectedPerfil(e.value)}
            placeholder="Seleccione"
            className="p-dropdown-sm"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-4 flex align-items-center p-mb-2">
          Centro de Servicio:
        </div>
        <div className="col-8" style={{ width: '100%' }}>
          <Dropdown
            value={selectedPerfil}
            options={centers?.map((center) => ({
              label: center.name,
              value: center.id,
            }))}
            onChange={(e) => setSelectedPerfil(e.value)}
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
