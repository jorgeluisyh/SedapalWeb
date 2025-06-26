import { ListBox } from 'primereact/listbox'

import type { CentersType } from '../../teams/types/centersType'

interface DualListBoxMapsProps {
  disponibles: CentersType[]
  seleccionados: CentersType[]
  setDisponibles: (items: CentersType[]) => void
  setSeleccionados: (items: CentersType[]) => void
  tituloDisponibles?: string
  tituloSeleccionados?: string
}

export const DualListBoxProfileZones = ({
  disponibles,
  seleccionados,
  setDisponibles,
  setSeleccionados,
  tituloDisponibles = 'Disponibles',
  tituloSeleccionados = 'Seleccionados',
}: DualListBoxMapsProps) => {
  const handleItemClick = (
    item: CentersType,
    fromList: 'disponibles' | 'seleccionados'
  ) => {
    if (fromList === 'disponibles') {
      setDisponibles(disponibles.filter((i) => i.id !== item.id))
      setSeleccionados([...seleccionados, item])
    } else {
      setSeleccionados(seleccionados.filter((i) => i.id !== item.id))
      setDisponibles([...disponibles, item])
    }
  }

  const itemTemplateDisponibles = (option: CentersType) => (
    <div
      className="flex justify-content-between align-items-center"
      onClick={() => handleItemClick(option, 'disponibles')}
    >
      <div>{option.name}</div>
      <i className="pi pi-angle-right mr-2"></i>
    </div>
  )

  const itemTemplateSeleccionados = (option: CentersType) => (
    <div
      className="flex align-items-center"
      onClick={() => handleItemClick(option, 'seleccionados')}
    >
      <i className="pi pi-angle-left mr-2"></i>
      <div>{option.name}</div>
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
