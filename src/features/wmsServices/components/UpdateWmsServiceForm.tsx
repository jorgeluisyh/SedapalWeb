import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { WmsService } from '../types/wmsServiceType'

interface UpdateWmsServiceFormProps {
  onSubmit: (data: WmsService) => Promise<void>
  currentService: WmsService
  handleClose: () => void
}

export const UpdateWmsServiceForm = ({
  currentService,
  handleClose,
  onSubmit,
}: UpdateWmsServiceFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<WmsService>({
    mode: 'onBlur',
    defaultValues: currentService,
  })

  const onSubmitUpdateElement = async (data: WmsService) => {
    await onSubmit(data)
    reset()
  }

  return (
    <Dialog
      header="Actualizar Servicio WMS"
      visible={true}
      maximizable
      style={{ width: '50vw' }}
      onHide={() => {
        handleClose()
      }}
    >
      <form onSubmit={handleSubmit(onSubmitUpdateElement)}>
        <FormInput
          name="idServicioWMS"
          label="ID"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese ID del servicio' }}
          hidden={true}
        />
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
            onClick={() => {
              handleClose()
              console.log('cerrar buton')
            }}
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
