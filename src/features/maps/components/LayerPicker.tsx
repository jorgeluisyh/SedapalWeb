import { useState, useEffect } from 'react'
import { PickList } from 'primereact/picklist'
import { getArcgisServices } from '../../arcgisServices/apis/arcgisServiceApi'
import type { ArcGisService } from '../../arcgisServices/types/arcgisServiceType'

export default function FilterDemo() {
  const [source, setSource] = useState<ArcGisService[]>([])
  const [target, setTarget] = useState<ArcGisService[]>([])

  //   useEffect(() => {
  //     ProductService.getProductsSmall().then((data) => setSource(data))
  //   }, [])

  useEffect(() => {
    const fetchArcgisServices = async () => {
      const arcgisServices = await getArcgisServices()
      setSource(arcgisServices)
    }
    fetchArcgisServices()
  }, [])

  const onChange = (event: {
    source: ArcGisService[]
    target: ArcGisService[]
  }) => {
    setSource(event.source)
    setTarget(event.target)
  }

  const itemTemplate = (item: ArcGisService) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.nombreServicioMapa}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.nombreServicioMapa}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.nombreServicioMapa}</span>
      </div>
    )
  }

  return (
    <div className="card">
      <PickList
        dataKey="id"
        source={source}
        target={target}
        onChange={onChange}
        itemTemplate={itemTemplate}
        filter
        filterBy="name"
        breakpoint="1280px"
        sourceHeader="Available"
        targetHeader="Selected"
        sourceStyle={{ height: '24rem' }}
        targetStyle={{ height: '24rem' }}
        sourceFilterPlaceholder="Search by name"
        targetFilterPlaceholder="Search by name"
      />
    </div>
  )
}
