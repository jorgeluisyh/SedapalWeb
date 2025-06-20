import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { TeamType } from '../types/teamType'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'

interface NewTeamFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: TeamType) => Promise<void>
}

export const NewTeamForm = ({
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

  const perfiles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ]
  return (
    <Dialog
      header="Agregar Equipo"
      visible={isModalOpen}
      maximizable
      style={{ width: '40vw' }}
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
            options={perfiles}
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
            options={perfiles}
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
