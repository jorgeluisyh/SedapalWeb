export interface Profile {
  idPerfil: number
  descripcion: string
  nombrePerfil: string
}

export interface FunctionType {
  idFuncion: number
  descripcion: string
  nombreFuncion: string
}

export interface PermissionsType {
  idPermiso: number
  nombre: string
  descripcion: string
}

/** Capa dentro de un proyecto */
export interface Layer {
  idCapa: number;
  instance: string;
  replicationType: 'Extract' | 'Export' | string;        // valores conocidos u otros
  replicationModelType: 'Full' | 'Simple' | string;      // valores conocidos u otros
  excludeFeatureClass: string | null;
  dataSource: string | null;
  editableLayer: string | null;
}

/** Proyecto que contiene un conjunto de capas */
export interface ProjectType {
  idProyecto: number;
  name: string;
  description: string;
  pathMxd: string;
  attributeAssistant: string;
  extension: string | null;
  addins: string;
  setDataSource: string | null;
  /** "2" llega como texto; cámbialo a number si el backend lo envía numérico */
  tipo: string;                                          
  capas: Layer[];
}

