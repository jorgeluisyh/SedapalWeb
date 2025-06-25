import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
// import type { TeamType } from '../types/teamType'
// import { Dropdown } from 'primereact/dropdown'
// import { useState } from 'react'
import type { AreasType } from '../types/areasType'
import type { CentersType } from '../types/centersType'
import type { UpdateTeamType } from '../types/updateTeamType'
import type { TeamType } from '../types/teamType'
import { FormDropdown } from '../../../shared/components/form/FormDropdown'

interface UpdateTeamFormProps {
  areas: AreasType[] | null
  centers: CentersType[] | null
  currentService: TeamType
  handleClose: () => void
  // onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: UpdateTeamType) => Promise<void>
}

export const UpdateTeamForm = ({
  areas,
  centers,
  currentService,
  handleClose,
  // onIsModalOpen,
  onSubmit,
}: UpdateTeamFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UpdateTeamType>({
    mode: 'onBlur',
    defaultValues: currentService,
  })

  const onSubmitUpdateElement = async (data: UpdateTeamType) => {
    await onSubmit(data)
    reset()
  }

  // const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)
  // const [selectedCenter, setSelectedCenter] = useState<string | null>(null)

  // const perfiles = [
  //   { label: 'Admin', value: 'admin' },
  //   { label: 'Editor', value: 'editor' },
  //   { label: 'Viewer', value: 'viewer' },
  // ]
  return (
    <Dialog
      header="Editar Equipo"
      visible={true}
      maximizable
      style={{ width: '35vw' }}
      onHide={() => {
        handleClose()
      }}
    >
      <form onSubmit={handleSubmit(onSubmitUpdateElement)}>
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

        <FormDropdown
          name="gerencia"
          label="Gerencia:"
          control={control}
          errors={errors}
          options={
            areas?.map((area) => ({
              label: area.name,
              value: area.id,
            })) ?? []
          }
          rules={{ required: 'Defina la Gerencia' }} // Puedes agregar reglas como required, minLength, etc.
          placeholder="Seleccione una generencia"
        />

        <FormDropdown
          name="centroServicio"
          label="Centro de Servicio:"
          control={control}
          errors={errors}
          options={
            centers?.map((center) => ({
              label: center.name,
              value: center.id,
            })) ?? []
          }
          rules={{ required: 'Defina el centor de servicio' }} // Puedes agregar reglas como required, minLength, etc.
          placeholder="Seleccione un centor de servicio"
        />
        {/* <div className="col-4 flex align-items-center p-mb-2">Gerencia:</div>
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
        </div> */}
        <div
          className="flex justify-content-center gap-4"
          style={{ marginTop: '20px' }}
        >
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            outlined
            onClick={() => {
              handleClose()
            }}
          />
          <Button
            disabled={!isValid || isSubmitting}
            label="Actualizar"
            type="submit"
            icon="pi pi-plus"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
