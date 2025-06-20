import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
// import type { MapType } from '../types/mapType'
import { InputText } from 'primereact/inputtext'
import { ListBox } from 'primereact/listbox'
import { useState } from 'react'
import { Button } from 'primereact/button'

interface NewMapFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: any) => Promise<void>
}

export const NewMapForm = ({ isModalOpen, onIsModalOpen }: NewMapFormProps) => {
  const {
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  })

  const [mapName, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<
    string[]
  >([])
  const [serviciosDisponibles, setServiciosDisponibles] = useState([
    'SGIO',
    'Análisis Redesmx',
    'ANFmxd',
    'Catastro Comercial',
    'AguaPotable',
    'Satélite ESRI',
    'Alcantarillado',
    'Curvas de Nivel',
    'Red Vial',
    'Mapa Base',
    'TIN',
    'Consulta Redesmx',
    'Gestión Comercialmx',
    'Supervisor Edicion ArcSDEmx',
  ])

  const handleItemClick = (item: string, fromList: string) => {
    if (fromList === 'disponibles') {
      // Eliminar del primer ListBox (disponibles)
      setServiciosDisponibles(serviciosDisponibles.filter((i) => i !== item))
      // Agregar al segundo ListBox (seleccionados)
      setServiciosSeleccionados([...serviciosSeleccionados, item])
    } else if (fromList === 'seleccionados') {
      // Eliminar del segundo ListBox (seleccionados)
      setServiciosSeleccionados(
        serviciosSeleccionados.filter((i) => i !== item)
      )
      // Agregar de nuevo al primer ListBox (disponibles)
      setServiciosDisponibles([...serviciosDisponibles, item])
    }
  }

  return (
    <Dialog
      header="Crear Mapa"
      visible={isModalOpen}
      maximizable
      style={{ width: '40vw' }}
      onHide={() => {
        if (!isModalOpen) return
        onIsModalOpen(false)
      }}
    >
      <div className="flex flex-column gap-3">
        <div className="flex flex-column">
          <label htmlFor="nombre" className="p-text-bold">
            Nombre del mapa:
          </label>
          <InputText
            id="nombre"
            value={mapName}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="flex flex-column">
          <label htmlFor="descripcion" className="p-text-bold">
            Descripción:
          </label>
          <InputText
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="grid">
          <div className="col-6">
            <h5>Servicios y/o MXDs disponibles</h5>
            <ListBox
              value={serviciosDisponibles}
              onChange={() => {}}
              multiple
              options={serviciosDisponibles}
              style={{ height: '200px', overflow: 'auto' }}
              listStyle={{ maxHeight: '200px' }}
              itemTemplate={(item: string) => (
                <div
                  onClick={() => handleItemClick(item, 'disponibles')}
                  style={{ cursor: 'pointer' }}
                >
                  {item}
                </div>
              )}
            />
          </div>

          <div className="col-6">
            <h5>Servicios y/o MXDs seleccionados</h5>
            <ListBox
              value={serviciosSeleccionados}
              onChange={() => {}}
              multiple
              options={serviciosSeleccionados}
              style={{ height: '200px', overflow: 'auto' }}
              listStyle={{ maxHeight: '200px' }}
              itemTemplate={(item: string) => (
                <div
                  onClick={() => handleItemClick(item, 'seleccionados')}
                  style={{ cursor: 'pointer' }}
                >
                  {item}
                </div>
              )}
            />
          </div>
        </div>
      </div>
      {/* Botones de acción */}
      <div className="flex justify-content-center gap-4 mt-4">
        <Button
          type="button"
          label="Cerrar"
          severity="secondary"
          outlined
          onClick={() => onIsModalOpen(false)}
        />
        <Button
          disabled={!isValid || isSubmitting}
          label="Guardar"
          type="submit"
          icon="pi pi-save"
          loading={isSubmitting}
        />
      </div>
    </Dialog>
  )
}
