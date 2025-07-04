import type { ArcGisService } from "../../arcgisServices/types/arcgisServiceType"
import type { ServiceMap } from "../types/serviceType"

export const toMapService = (raw: ArcGisService) : ServiceMap=> ({
     
        idServicioMapa: raw.idServicioMapa,
        nombreServicioMapa: raw.nombreServicioMapa,
        visible: 0,
    
})
