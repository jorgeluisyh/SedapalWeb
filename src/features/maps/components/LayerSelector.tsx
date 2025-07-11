import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import type { ServiceMap } from '../types/serviceType'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Checkbox } from 'primereact/checkbox'

interface LayerSelectorProps {
  availableItems: ServiceMap[]
  currentAssignedItems?: ServiceMap[]
  onAssignedItemsChange: (assignedItems: ServiceMap[]) => void
}
export const LayerSelector = ({
  availableItems,
  currentAssignedItems,
  onAssignedItemsChange,
}: LayerSelectorProps) => {
  const [assignedItems, setAssignedItems] = useState<ServiceMap[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const filteredItems = availableItems.filter(
    (service: ServiceMap) =>
      service.nombreServicioMapa
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.nombreServicioMapa
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )
  availableItems = filteredItems
  if (currentAssignedItems) {
    useEffect(() => {
      setAssignedItems(currentAssignedItems)
    }, [])
  }

  const addItem = (item: ServiceMap) => {
    if (!assignedItems.find((p) => p.idServicioMapa === item.idServicioMapa)) {
      const newAssignedItems = [
        ...assignedItems,
        { ...item, posicion: assignedItems.length },
      ]
      setAssignedItems(newAssignedItems)
      onAssignedItemsChange(newAssignedItems)
    }
  }

  const removeItem = (itemId: number) => {
    const newAssignedItems = assignedItems.filter(
      (p) => p.idServicioMapa !== itemId
    )
    const updatedAssignedItems = newAssignedItems.map((item, index) => ({
      ...item,
      posicion: index,
    }))
    setAssignedItems(updatedAssignedItems)
    onAssignedItemsChange(updatedAssignedItems)
  }

  const moveItemUp = (index: number) => {
    if (index > 0) {
      const newItems = [...assignedItems]
      const temp = newItems[index]
      newItems[index] = newItems[index - 1]
      newItems[index - 1] = temp
      // Actualizamos las posiciones después del movimiento
      newItems[index].posicion = index
      newItems[index - 1].posicion = index - 1
      setAssignedItems(newItems)
      onAssignedItemsChange(newItems)
    }
  }

  const moveItemDown = (index: number) => {
    if (index < assignedItems.length - 1) {
      const newItems = [...assignedItems]
      const temp = newItems[index]
      newItems[index] = newItems[index + 1]
      newItems[index + 1] = temp
      // Actualizamos las posiciones después del movimiento
      newItems[index].posicion = index
      newItems[index + 1].posicion = index + 1
      setAssignedItems(newItems)
      onAssignedItemsChange(newItems)
    }
  }

  const getAvailableItems = () => {
    return availableItems.filter(
      (item) =>
        !assignedItems.find(
          (assigned) => assigned.idServicioMapa === item.idServicioMapa
        )
    )
  }

  const assignedHeaderTemplate = () => {
    return (
      <div className="flex align-items-center gap-2  m-0">
        <p className=" text-2xl font-bold m-0">Servicios Asignados</p>
        <Badge value={assignedItems.length} severity="info" />
      </div>
    )
  }

  const handleCheckboxChange = (
    itemId: number,
    checked: boolean | undefined
  ) => {
    const updatedItems = assignedItems.map((item) =>
      item.idServicioMapa === itemId
        ? { ...item, visible: checked ? 1 : 0 }
        : item
    )
    setAssignedItems(updatedItems)
    onAssignedItemsChange(updatedItems)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-2 justify-content-center">
        {/* Mapas Disponibles */}
        <Card
          title="Servicios Disponibles"
          // className="m-0 h-96 overflow-y-auto layer-card"
          style={{ maxWidth: '560px', height: '600px' }}
        >
          <div className="flex-col  gap-4">
            <div className="relative">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className=" p-inputtext-sm pl-10"
                  placeholder="Buscar servicios..."
                />
              </IconField>
            </div>
            <div
              className="space-y-3"
              style={{ height: '400px', overflow: 'auto' }}
            >
              {getAvailableItems().length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p>Todos los servicios han sido asignados</p>
                </div>
              ) : (
                getAvailableItems().map((item) => (
                  <div
                    key={item.idServicioMapa}
                    className="flex items-center justify-content-between p-3 gap-2 border-gray-300 p-inputtext-sm rounded-lg background-blue-50  hover:bg-gray-50"
                  >
                    <div className="flex align-items-center justify-between gap-3">
                      <div>
                        <h4 className="font-medium m-0">
                          {item.nombreServicioMapa}
                        </h4>
                      </div>
                    </div>
                    <Button
                      type="button"
                      className="m-2"
                      size="small"
                      outlined
                      severity="info"
                      onClick={() => addItem(item)}
                    >
                      <i className="pi pi-plus"></i>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Mapas Asignados */}
        <Card
          title={assignedHeaderTemplate()}
          // className="m-0 h-20 overflow-y-auto layer-card"
          style={{ width: '560px', height: '600px' }}
        >
          <div
            className="space-y-3"
            style={{ height: '400px', overflow: 'auto' }}
          >
            {assignedItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No hay servicios asignados</p>
                <p className="text-sm">
                  Agrega servicios desde la lista disponible
                </p>
              </div>
            ) : (
              assignedItems.map((item, index) => (
                <div
                  key={item.idServicioMapa}
                  className="flex items-center justify-content-between p-3 gap-2 border rounded-lg bg-green-50 border-green-200"
                >
                  <div className="flex align-items-center justify-content-center gap-3">
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        rounded
                        text
                        severity="info"
                        onClick={() => moveItemUp(index)}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <i className="pi pi-arrow-up"></i>
                      </Button>
                      <Button
                        type="button"
                        rounded
                        text
                        severity="info"
                        onClick={() => moveItemDown(index)}
                        disabled={index === assignedItems.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <i className="pi pi-arrow-down"></i>
                      </Button>
                    </div>
                    <Badge value={index} severity="info" />
                    <div>
                      <h4 className="font-medium m-0">
                        {item.nombreServicioMapa}
                      </h4>
                    </div>
                  </div>
                  <div className="flex align-items-center gap-2">
                    <div className="flex align-items-center gap-0">
                      <Checkbox
                        variant="filled"
                        inputId={item.idServicioMapa.toString()}
                        checked={item.visible === 1}
                        onChange={(e) =>
                          handleCheckboxChange(item.idServicioMapa, e.checked)
                        }
                      />
                      <label
                        htmlFor={item.idServicioMapa.toString()}
                        className="ml-2"
                      >
                        Visible
                      </label>
                    </div>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => removeItem(item.idServicioMapa)}
                      outlined
                      severity="danger"
                    >
                      <i className="pi pi-minus"></i>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
