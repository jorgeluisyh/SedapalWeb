import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
// import { useForm, register } from 'react-hook-form';
// import { FormInput } from '../../../shared/components/form/FormInput'
import type { Profile } from '../types/profileType'
import { InputText } from 'primereact/inputtext'

interface NewProfileFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: Profile) => Promise<void>
}

export const NewProfileForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewProfileFormProps) => {
  const {
    // control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    register,
  } = useForm<Profile>({
    mode: 'onBlur',
  })

  const onSubmitNewProduct = async (data: Profile) => {
    await onSubmit(data)
    reset()
  }

  return (
    <Dialog
      header="Crear Perfil"
      visible={isModalOpen}
      maximizable
      style={{ width: '60vw' }}
      onHide={() => {
        if (!isModalOpen) return
        onIsModalOpen(false)
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmitNewProduct)}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        {/* Inputs de la cabecera */}
        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label htmlFor="nombre">Nombre del perfil: </label>
            <InputText
              id="nombre"
              style={{ width: '60%' }}
              //   name="nombre"
              //   control={control}
              {...register('nombre', {
                required: 'Ingrese nombre del perfil',
              })}
              className="p-inputtext-sm"
            />
            {errors.nombre && (
              <small
                className="p-error"
                style={{ display: 'block', marginTop: '5px' }}
              >
                {errors.nombre.message}
              </small>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="descripcion">Descripción: </label>
            <InputText
              id="descripcion"
              style={{ width: '60%' }}
              //   name="descripcion"
              //   control={control}
              {...register('descripcion', {
                required: 'Ingrese la descripción del perfil',
              })}
              className="p-inputtext-sm"
            />
            {errors.descripcion && (
              <small
                className="p-error"
                style={{ display: 'block', marginTop: '5px' }}
              >
                {errors.descripcion.message}
              </small>
            )}
          </div>
        </div>

        {/* Divisiones para los listados de elementos */}
        <div className="grid grid-nogutter">
          {/* Sección de Funciones */}
          <div className="col-6">
            <h5>Funciones Disponibles</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '150px',
                overflowY: 'auto',
                padding: '5px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de funciones se agregará aquí */}
            </div>
          </div>
          <div className="col-6">
            <h5>Funciones asignadas</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '150px',
                overflowY: 'auto',
                padding: '10px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de funciones se agregará aquí */}
            </div>
          </div>
        </div>

        {/* Divisiones para los listados de mapas */}
        <div className="grid grid-nogutter">
          {/* Sección de mapas disponibles */}
          <div className="col-6">
            <h5>Mapas Disponibles</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '150px',
                overflowY: 'auto',
                padding: '5px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de mapas se agregará aquí */}
            </div>
          </div>

          {/* Sección de Mapas asignados*/}
          <div className="col-6">
            <h5>Mapas asignados</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '150px',
                overflowY: 'auto',
                padding: '10px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de mapas se agregará aquí */}
            </div>
          </div>
        </div>

        {/* Divisiones para los listados de zonas */}
        <div className="grid grid-nogutter mt-4">
          {/* Sección de Zonas */}
          <div className="col-6">
            <h5>Zonas disponibles</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '150px',
                overflowY: 'auto',
                padding: '10px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de zonas se agregará aquí */}
            </div>
          </div>

          {/* Sección de Permisos */}
          <div className="col-6">
            <h5>Zonas asignados</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '150px',
                overflowY: 'auto',
                padding: '10px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de permisos se agregará aquí */}
            </div>
          </div>
        </div>

        {/* Divisiones para los listados de permisos */}
        <div className="grid grid-nogutter mt-4">
          {/* Sección de Permisos */}
          <div className="col-6">
            <h5>Permisos disponibles</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '150px',
                overflowY: 'auto',
                padding: '10px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de permisos se agregará aquí */}
            </div>
          </div>

          {/* Sección de Permisos */}
          <div className="col-6">
            <h5>Permisos asignados</h5>
            <div
              className="p-shadow-2"
              style={{
                height: '200px',
                overflowY: 'auto',
                padding: '10px',
                border: '1px solid #ddd',
              }}
            >
              {/* Listado de permisos se agregará aquí */}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-content-center gap-4 mt-4">
          <Button
            type="button"
            label="Cerrar"
            severity="secondary"
            outlined
            onClick={() => onIsModalOpen(false)}
          />
          <Button
            disabled={!isValid || isSubmitting}
            label="Guardar"
            type="submit"
            icon="pi pi-save"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
