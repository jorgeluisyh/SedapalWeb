import { ListBox } from 'primereact/listbox'
import type { FunctionType } from '../types/profileType'

interface DualListBoxProps {
  disponibles: FunctionType[]
  seleccionados: FunctionType[]
  setDisponibles: (items: FunctionType[]) => void
  setSeleccionados: (items: FunctionType[]) => void
  tituloDisponibles?: string
  tituloSeleccionados?: string
}

export const DualListBoxProfileFunctions = ({
  disponibles,
  seleccionados,
  setDisponibles,
  setSeleccionados,
  tituloDisponibles = 'Disponibles',
  tituloSeleccionados = 'Seleccionados',
}: DualListBoxProps) => {
  const handleItemClick = (
    item: FunctionType,
    fromList: 'disponibles' | 'seleccionados'
  ) => {
    if (fromList === 'disponibles') {
      setDisponibles(disponibles.filter((i) => i.idFuncion !== item.idFuncion))
      setSeleccionados([...seleccionados, item])
    } else {
      setSeleccionados(
        seleccionados.filter((i) => i.idFuncion !== item.idFuncion)
      )
      setDisponibles([...disponibles, item])
    }
  }

  const itemTemplateDisponibles = (option: FunctionType) => (
    <div
      className="flex justify-content-between align-items-center"
      onClick={() => handleItemClick(option, 'disponibles')}
    >
      <div>{option.nombreFuncion}</div>
      <i className="pi pi-angle-right mr-2"></i>
    </div>
  )

  const itemTemplateSeleccionados = (option: FunctionType) => (
    <div
      className="flex align-items-center"
      onClick={() => handleItemClick(option, 'seleccionados')}
    >
      <i className="pi pi-angle-left mr-2"></i>
      <div>{option.nombreFuncion}</div>
    </div>
  )

  return (
    <div className="grid">
      <div className="col-6">
        <h5 className="mb-2">{tituloDisponibles}</h5>
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
