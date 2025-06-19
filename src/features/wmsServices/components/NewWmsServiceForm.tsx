import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { WmsService } from '../types/wmsServiceType'

interface NewWmsServiceFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: WmsService) => Promise<void>
}

export const NewWmsServiceForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewWmsServiceFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<WmsService>({
    mode: 'onBlur',
  })

  const onSubmitNewElement = async (data: WmsService) => {
    await onSubmit(data)
    reset()
  }

  return (
    <Dialog
      header="Nuevo Servicio WMS"
      visible={isModalOpen}
      maximizable
      style={{ width: '50vw' }}
      onHide={() => {
        if (!isModalOpen) return
        onIsModalOpen(false)
      }}
    >
      <form onSubmit={handleSubmit(onSubmitNewElement)}>
        <FormInput
          name="nombreServicioWMS"
          label="Nombre"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese nombre del servicio' }}
        />

        <FormInput
          name="descripcion"
          label="Descripción"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese la descripción del servicio' }}
        />

        <FormInput
          name="urlServicioWMS"
          label="URL"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese URL del servicio' }}
        />

        <div className="flex justify-content-center gap-4">
          <Button
            type="button"
            label="Cerrar"
            severity="secondary"
            outlined
            onClick={() => onIsModalOpen(false)}
          />
          <Button
            disabled={!isValid || isSubmitting}
            label="Crear Servicio"
            type="submit"
            icon="pi pi-plus"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
