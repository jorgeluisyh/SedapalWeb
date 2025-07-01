import { ListBox } from 'primereact/listbox'
import { useEffect } from 'react'

// Definimos la interfaz DualListBoxProps con tipo genérico T
interface DualListBoxProps<T> {
  disponibles?: T[]
  seleccionados?: T[]
  setDisponibles: (items: T[]) => void
  setSeleccionados: (items: T[]) => void
  labelFieldName: keyof T
  tituloDisponibles?: string
  tituloSeleccionados?: string
}

export const DualListBox = <T extends unknown>({
  disponibles: propDisponibles,
  seleccionados: propSeleccionados,
  setDisponibles,
  setSeleccionados,
  labelFieldName,
  tituloDisponibles = 'Disponibles',
  tituloSeleccionados = 'Seleccionados',
}: DualListBoxProps<T>) => {
  // Aseguramos que siempre trabajemos con arrays, incluso si los props son undefined
  const disponibles = propDisponibles || []
  const seleccionados = propSeleccionados || []

  // Filtrar disponibles para excluir los seleccionados
  useEffect(() => {
    const filteredDisponibles = disponibles.filter(
      (item) =>
        !seleccionados.some(
          (selected) => selected[labelFieldName] === item[labelFieldName]
        )
    )

    // Solo actualizar si hay diferencia para evitar renderizados innecesarios
    if (
      filteredDisponibles.length !== disponibles.length ||
      JSON.stringify(filteredDisponibles) !== JSON.stringify(disponibles)
    ) {
      setDisponibles(filteredDisponibles)
    }
  }, [disponibles, seleccionados, setDisponibles])

  const handleItemClick = (
    item: T,
    fromList: 'disponibles' | 'seleccionados'
  ) => {
    if (fromList === 'disponibles') {
      // Mover de disponibles a seleccionados
      setDisponibles(
        disponibles.filter((i) => i[labelFieldName] !== item[labelFieldName])
      )
      setSeleccionados([...seleccionados, item])
    } else {
      // Mover de seleccionados a disponibles
      setSeleccionados(
        seleccionados.filter((i) => i[labelFieldName] !== item[labelFieldName])
      )
      setDisponibles([...disponibles, item])
    }
  }

  const itemTemplateDisponibles = (option: T) => (
    <div
      className="flex justify-content-between align-items-center"
      onClick={() => handleItemClick(option, 'disponibles')}
    >
      <div>{(option as any)[labelFieldName]}</div>
      <i className="pi pi-angle-right mr-2"></i>
    </div>
  )

  const itemTemplateSeleccionados = (option: T) => (
    <div
      className="flex align-items-center"
      onClick={() => handleItemClick(option, 'seleccionados')}
    >
      <i className="pi pi-angle-left mr-2"></i>
      <div>{(option as any)[labelFieldName]}</div>
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
