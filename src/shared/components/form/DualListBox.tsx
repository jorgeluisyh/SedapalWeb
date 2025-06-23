import { ListBox } from 'primereact/listbox'

interface DualListBoxProps {
  disponibles: string[]
  seleccionados: string[]
  setDisponibles: (items: string[]) => void
  setSeleccionados: (items: string[]) => void
  tituloDisponibles?: string
  tituloSeleccionados?: string
}

export const DualListBox = ({
  disponibles,
  seleccionados,
  setDisponibles,
  setSeleccionados,
  tituloDisponibles = 'Disponibles',
  tituloSeleccionados = 'Seleccionados',
}: DualListBoxProps) => {
  const handleItemClick = (
    item: string,
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

  const itemTemplateDisponibles = (option: string) => (
    <div
      className="flex justify-content-between align-items-center"
      onClick={() => handleItemClick(option, 'disponibles')}
    >
      <div>{option}</div>
      <i className="pi pi-angle-right mr-2"></i>
    </div>
  )

  const itemTemplateSeleccionados = (option: string) => (
    <div
      className="flex align-items-center"
      onClick={() => handleItemClick(option, 'seleccionados')}
    >
      <i className="pi pi-angle-left mr-2"></i>
      <div>{option}</div>
    </div>
  )

  return (
    <div className="grid">
      <div className="col-6">
        <h5>{tituloDisponibles}</h5>
        <ListBox
          value={disponibles}
          options={disponibles}
          onChange={() => {}}
          style={{ height: '200px', overflow: 'auto' }}
          itemTemplate={itemTemplateDisponibles}
          emptyMessage="No hay elementos disponibles"
        />
      </div>
      <div className="col-6">
        <h5>{tituloSeleccionados}</h5>
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
