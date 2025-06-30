import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import type { Map } from '../types/mapType'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { ServiceMap } from '../types/serviceType'
import { LayerSelector } from './LayerSelector'

interface UpdateMapFormProps {
  currentService: Map
  availableItems: ServiceMap[]
  onSubmit: (data: any) => Promise<void>
  handleClose: () => void
}

export const UpdateMapForm = ({
  currentService,
  availableItems,
  onSubmit,
  handleClose,
}: UpdateMapFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Map>({
    mode: 'onBlur',
    defaultValues: currentService,
  })

  const onSubmitNewElement = async (data: Map) => {
    console.log(data)
    await onSubmit(data)
    reset()
  }

  const handleAssignedItemsChange = (assignedItems: ServiceMap[]) => {
    setValue('servicios', assignedItems) // Actualiza los perfiles en el formulario
  }

  return (
    <Dialog
      header="Actualizar Mapa"
      visible
      maximizable
      style={{ width: '60vw' }}
      onHide={() => {
        handleClose()
      }}
    >
      <form onSubmit={handleSubmit(onSubmitNewElement)}>
        <FormInput
          name="nombreMapa"
          label="Nombre del Mapa:"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese nombre del mapa' }}
        />
        <FormInput
          name="descripcion"
          label="Descripción:"
          control={control}
          errors={errors}
        />
        <LayerSelector
          availableItems={availableItems}
          currentAssignedItems={currentService.servicios}
          onAssignedItemsChange={handleAssignedItemsChange}
        ></LayerSelector>
        <div className="flex justify-content-center gap-4 mt-4">
          <Button
            type="button"
            label="Cerrar"
            severity="secondary"
            outlined
            onClick={() => handleClose()}
          />
          <Button
            disabled={!isValid || isSubmitting}
            label="Actualizar"
            type="submit"
            icon="pi pi-save"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
