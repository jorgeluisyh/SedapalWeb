import { ListBox } from 'primereact/listbox'
import type { Map } from '../../maps/types/mapType'

interface DualListBoxMapsProps {
  disponibles: Map[]
  seleccionados: Map[]
  setDisponibles: (items: Map[]) => void
  setSeleccionados: (items: Map[]) => void
  tituloDisponibles?: string
  tituloSeleccionados?: string
}

export const DualListBoxProfileMaps = ({
  disponibles,
  seleccionados,
  setDisponibles,
  setSeleccionados,
  tituloDisponibles = 'Disponibles',
  tituloSeleccionados = 'Seleccionados',
}: DualListBoxMapsProps) => {
  const handleItemClick = (
    item: Map,
    fromList: 'disponibles' | 'seleccionados'
  ) => {
    if (fromList === 'disponibles') {
      setDisponibles(disponibles.filter((i) => i.idMapa !== item.idMapa))
      setSeleccionados([...seleccionados, item])
    } else {
      setSeleccionados(seleccionados.filter((i) => i.idMapa !== item.idMapa))
      setDisponibles([...disponibles, item])
    }
  }

  const itemTemplateDisponibles = (option: Map) => (
    <div
      className="flex justify-content-between align-items-center"
      onClick={() => handleItemClick(option, 'disponibles')}
    >
      <div>{option.nombreMapa}</div>
      <i className="pi pi-angle-right mr-2"></i>
    </div>
  )

  const itemTemplateSeleccionados = (option: Map) => (
    <div
      className="flex align-items-center"
      onClick={() => handleItemClick(option, 'seleccionados')}
    >
      <i className="pi pi-angle-left mr-2"></i>
      <div>{option.nombreMapa}</div>
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
