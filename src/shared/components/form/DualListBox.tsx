import { ListBox } from 'primereact/listbox'

// Definimos la interfaz DualListBoxProps con tipo genérico T
interface DualListBoxProps<T> {
  disponibles: T[]
  seleccionados: T[]
  setDisponibles: (items: T[]) => void
  setSeleccionados: (items: T[]) => void
  labelFieldName: keyof T
  tituloDisponibles?: string
  tituloSeleccionados?: string
}

export const DualListBox = <T extends unknown>({
  disponibles,
  seleccionados,
  setDisponibles,
  setSeleccionados,
  labelFieldName,
  tituloDisponibles = 'Disponibles',
  tituloSeleccionados = 'Seleccionados',
}: DualListBoxProps<T>) => {
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

  const getAvailableItems = () => {
    debugger
    return disponibles.filter(
      (item) => !seleccionados.find((assigned) => assigned === item)
    )
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
    <div className="grid">
      <div className="col-6">
        <h5 className="mb-2">{tituloDisponibles}</h5>
        <ListBox
          value={getAvailableItems()}
          options={getAvailableItems()}
          onChange={() => {}}
          style={{ height: '200px', overflow: 'auto' }}
          itemTemplate={itemTemplateDisponibles}
          emptyMessage="No hay elementos disponibles"
        />
      </div>
      <div className="col-6">
        <h5 className="mb-2">{tituloSeleccionados}</h5>
        <ListBox
          value={seleccionados}
          options={seleccionados}
          onChange={() => {}}
          style={{ height: '200px', overflow: 'auto' }}
          itemTemplate={itemTemplateSeleccionados}
          emptyMessage="No hay elementos seleccionados"
        />
      </div>
    </div>
  )
}
