import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
// import type { MapType } from '../types/mapType'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { DualListBox } from '../../../shared/components/form/DualListBox'

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

        <DualListBox
          disponibles={serviciosDisponibles}
          seleccionados={serviciosSeleccionados}
          setDisponibles={setServiciosDisponibles}
          setSeleccionados={setServiciosSeleccionados}
          tituloDisponibles="Servicios y/o MXDs disponibles"
          tituloSeleccionados="Servicios y/o MXDs seleccionados"
        />
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
