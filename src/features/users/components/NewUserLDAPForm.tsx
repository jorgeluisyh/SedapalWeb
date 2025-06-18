import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import type { User } from '../types/userType'

interface NewUserFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: User) => Promise<void>
}

export const NewUserForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewUserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<User>({
    mode: 'onBlur',
  })

  const onSubmitNewProduct = async (data: User) => {
    await onSubmit(data)
    reset()
  }
  return (
    <Dialog
      header="Nuevo Usuario LDAP"
      visible={isModalOpen}
      maximizable
      style={{ width: '50vw' }}
      onHide={() => {
        if (!isModalOpen) return
        onIsModalOpen(false)
      }}
    >
      <form onSubmit={handleSubmit(onSubmitNewProduct)}>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="tinametle">Title</label>
          <InputText
            {...register('username', { required: true })}
            invalid={errors?.username !== undefined}
          />
          <small className="p-error" hidden={errors?.username === undefined}>
            Ingrese nombre del producto
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="title">Category</label>
          <InputText
            {...register('profile', { required: true })}
            invalid={errors?.profile !== undefined}
          />
          <small className="p-error" hidden={errors?.profile === undefined}>
            Ingrese nombre de la categoria
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="price">Price</label>
          <InputText
            {...register('team', { required: true })}
            invalid={errors?.team !== undefined}
          />
          <small className="p-error" hidden={errors?.team === undefined}>
            Ingrese precio del producto
          </small>
        </div>
        <div className="flex justify-content-center gap-4">
          <Button
            type="button"
            label="cerrar"
            severity="secondary"
            outlined
            onClick={() => onIsModalOpen(false)}
          />
          <Button
            disabled={!isValid || isSubmitting}
            label="Create Product"
            type="submit"
            icon="pi pi-plus"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
