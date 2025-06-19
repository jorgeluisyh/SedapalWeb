import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { TeamType } from '../types/teamType'

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
          rules={{ required: 'Ingrese nombre del servicio' }}
        />

        <FormInput
          name="correo"
          label="Correo"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese URL del servicio' }}
        />
        <FormInput
          name="descripcion"
          label="Descripción"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese la descripción del servicio' }}
        />

        <div className="flex justify-content-center gap-4">
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
