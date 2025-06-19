import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import type { NewUserExternal } from '../types/newUserExternalType'
// import { NewUserForm } from './NewUserForm';

interface NewUserExternalFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: NewUserExternal) => Promise<void>
  onHide: () => void
}

export const NewUserExternalForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewUserExternalFormProps) => {
  const { register, handleSubmit, reset } = useForm<NewUserExternal>({
    mode: 'onBlur',
  })

  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)

  const perfiles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ]

  const onSubmitNewProduct = async (data: NewUserExternal) => {
    await onSubmit(data)
    reset()
  }

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Agregar"
        icon="pi pi-check"
        onClick={handleSubmit(onSubmitNewProduct)}
        className="p-button-sm p-button-primary"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        onClick={() => onIsModalOpen(false)}
        className="p-button-sm"
      />
    </div>
  )

  return (
    <Dialog
      header="Agregar usuario Externo"
      visible={isModalOpen}
      maximizable
      style={{ width: '40vw' }}
      onHide={() => onIsModalOpen(false)}
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmitNewProduct)}>
        {/* Login */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="login" className="p-text-bold">
            Login:
          </label>
          <InputText
            id="login"
            {...register('login', { required: 'Login es requerido' })}
          />
        </div>

        {/* Representante */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="representante" className="p-text-bold">
            Representante:
          </label>
          <InputText
            id="representante"
            {...register('representante', {
              required: 'Representante es requerido',
            })}
          />
        </div>

        {/* Email */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="email" className="p-text-bold">
            Email:
          </label>
          <InputText
            id="email"
            type="email"
            {...register('email', { required: 'Email es requerido' })}
          />
        </div>

        {/* Descripción */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="descripcion" className="p-text-bold">
            Descripción:
          </label>
          <InputText
            id="descripcion"
            {...register('descripcion', {
              required: 'Descripción es requerida',
            })}
          />
        </div>

        {/* Razón Social */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="razonSocial" className="p-text-bold">
            Razón Social:
          </label>
          <InputText
            id="razonSocial"
            {...register('razonSocial', {
              required: 'Razón Social es requerida',
            })}
          />
        </div>

        {/* Teléfono */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="telefono" className="p-text-bold">
            Teléfono:
          </label>
          <InputText
            id="telefono"
            {...register('telefono', { required: 'Teléfono es requerido' })}
          />
        </div>

        {/* Ruc/Dni */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="rucDni" className="p-text-bold">
            Ruc/Dni:
          </label>
          <InputText
            id="rucDni"
            {...register('rucDni', { required: 'Ruc/Dni es requerido' })}
          />
        </div>

        {/* Notas */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="notas" className="p-text-bold">
            Notas:
          </label>
          <InputText
            id="notas"
            {...register('notas', { required: 'Notas son requeridas' })}
          />
        </div>

        {/* Perfiles */}
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="perfil" className="p-text-bold">
            Perfiles:
          </label>
          <Dropdown
            id="perfil"
            value={selectedPerfil}
            options={perfiles}
            onChange={(e) => setSelectedPerfil(e.value)}
            placeholder="Seleccione"
            className="p-dropdown-sm"
          />
        </div>
      </form>
    </Dialog>
  )
}
