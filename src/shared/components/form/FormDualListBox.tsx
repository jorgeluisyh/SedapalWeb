import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { ListBox } from 'primereact/listbox'

// Definimos la interfaz DualListBoxProps con tipo genérico T
interface FormDualListBoxProps<T> {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  disponibles: T[]
  seleccionados: T[]
  setDisponibles: (items: T[]) => void
  setSeleccionados: (items: T[]) => void
  labelFieldName: keyof T
  tituloDisponibles?: string
  tituloSeleccionados?: string
}

export const FormDualListBox = <T extends unknown>({
  name,
  label,
  control,
  errors,
  disponibles,
  seleccionados,
  setDisponibles,
  setSeleccionados,
  labelFieldName,
  tituloDisponibles = 'Disponibles',
  tituloSeleccionados = 'Seleccionados',
}: FormDualListBoxProps<T>) => {
  const handleItemClick = (
    item: T,
    fromList: 'disponibles' | 'seleccionados'
  ) => {
    if (fromList === 'disponibles') {
      setDisponibles(disponibles.filter((i) => i !== item))
      setSeleccionados([...seleccionados, item])
    } else {
      setSeleccionados(seleccionados.filter((i) => i !== item))
      setDisponibles([...disponibles, item])
    }
  }

  const itemTemplateDisponibles = (option: T) => (
    <div
      className="flex justify-content-between align-items-center"
      onClick={() => handleItemClick(option, 'disponibles')}
    >
      <div>{(option as any)[labelFieldName]}</div>{' '}
      <i className="pi pi-angle-right mr-2"></i>
    </div>
  )

  const itemTemplateSeleccionados = (option: T) => (
    <div
      className="flex align-items-center"
      onClick={() => handleItemClick(option, 'seleccionados')}
    >
      <i className="pi pi-angle-left mr-2"></i>
      <div>{(option as any)[labelFieldName]}</div>{' '}
      {/* Renderizamos la opción */}
    </div>
  )

  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="grid">
            <div className="col-6">
              <h5 className="mb-2">{tituloDisponibles}</h5>
              <ListBox
                value={field.value?.disponibles || disponibles}
                options={disponibles}
                onChange={(e) =>
                  field.onChange({
                    ...field.value,
                    disponibles: e.value.map((item: any) => item.idFuncion), // Solo extraemos los idFuncion
                  })
                }
                style={{ height: '200px', overflow: 'auto' }}
                itemTemplate={itemTemplateDisponibles}
                emptyMessage="No hay elementos disponibles"
              />
            </div>
            <div className="col-6">
              <h5 className="mb-2">{tituloSeleccionados}</h5>
              <ListBox
                value={field.value?.seleccionados || seleccionados}
                options={seleccionados}
                onChange={(e) =>
                  field.onChange({
                    ...field.value,
                    seleccionados: e.value.map((item: any) => item.idFuncion), // Solo extraemos los idFuncion
                  })
                }
                style={{ height: '200px', overflow: 'auto' }}
                itemTemplate={itemTemplateSeleccionados}
                emptyMessage="No hay elementos seleccionados"
              />
            </div>
          </div>
        )}
      />
      <small className="p-error" hidden={errors[name] === undefined}>
        {errors[name]?.message as string}
      </small>
    </div>
  )
}
