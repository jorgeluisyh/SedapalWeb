import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { ArcGisService } from '../types/arcgisServiceType'
import { FormDropdown } from '../../../shared/components/form/FormDropdown'

interface NewArcgisServiceFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: ArcGisService) => Promise<void>
}

export const NewArcgisServiceForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewArcgisServiceFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ArcGisService>({
    mode: 'onBlur',
  })

  const onSubmitNewElement = async (data: ArcGisService) => {
    await onSubmit(data)
    reset()
  }

  const cacheadoOptions = [
    { label: 'Cacheado', value: 1 },
    { label: 'Dinámico', value: 2 },
    { label: 'MXD', value: 3 },
  ]

  return (
    <Dialog
      header="Nuevo Servicio ArcGIS"
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
          name="nombreServicioMapa"
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
          name="urlServicioMapa"
          label="URL/Ruta MXDs"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese URL del servicio' }}
        />

        <FormDropdown
          name="cacheado"
          label="Tipo"
          control={control}
          errors={errors}
          options={cacheadoOptions}
          rules={{ required: 'Defina tipo del servicio' }} // Puedes agregar reglas como required, minLength, etc.
          placeholder="Seleccione un tipo"
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
