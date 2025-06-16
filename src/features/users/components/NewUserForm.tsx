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
      header="Nuevo Producto"
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
            {...register('name', { required: true })}
            invalid={errors?.name !== undefined}
          />
          <small className="p-error" hidden={errors?.name === undefined}>
            Ingrese nombre del producto
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="title">Category</label>
          <InputText
            {...register('company', { required: true })}
            invalid={errors?.company !== undefined}
          />
          <small className="p-error" hidden={errors?.company === undefined}>
            Ingrese nombre de la categoria
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="price">Price</label>
          <InputText
            {...register('age', { required: true })}
            invalid={errors?.age !== undefined}
          />
          <small className="p-error" hidden={errors?.age === undefined}>
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
