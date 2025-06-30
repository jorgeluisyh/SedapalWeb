import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import type { Map } from '../../maps/types/mapType'
import {
  type FunctionType,
  type Profile,
  type PermissionsType,
  type ProjectType,
} from '../types/profileType'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { DualListBox } from '../../../shared/components/form/DualListBox'
import { FormDualListBox } from '../../../shared/components/form/FormDualListBox'
import type { CentersType } from '../../teams/types/centersType'
import type { InsertProfileType } from '../types/insertProfileType'

interface NewProfileFormProps {
  availableFunctions: FunctionType[]
  availableMaps: Map[]
  availableCenters: CentersType[]
  availablePermissions: PermissionsType[]
  availableProjects: ProjectType[]
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: InsertProfileType) => Promise<void>
}

export const NewProfileForm = ({
  availableFunctions,
  availableMaps,
  availableCenters,
  availablePermissions,
  availableProjects,
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewProfileFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    register,
  } = useForm<InsertProfileType>({
    mode: 'onBlur',
  })

  const [funcionesSeleccionados, setFuncionesSeleccionados] = useState<
    FunctionType[]
  >([])
  const [funcionesDisponibles, setFuncionesDisponibles] =
    useState<FunctionType[]>(availableFunctions)

  const [mapasDisponibles, setMapsDisponibles] = useState<Map[]>(availableMaps)
  const [mapasSeleccionados, setMapasSeleccionados] = useState<Map[]>([])

  const [centersDisponibles, setCentersDisponibles] =
    useState<CentersType[]>(availableCenters)
  const [centersSeleccionados, setCentersSeleccionados] =
    useState<CentersType[]>(availableCenters)

  const [permisosDisponibles, setPermisosDisponibles] =
    useState<PermissionsType[]>(availablePermissions)
  const [permisosSeleccionados, setPermisosSeleccionados] = useState<
    PermissionsType[]
  >([])

  const [proyectosDisponibles, setProyectosDisponibles] =
    useState<ProjectType[]>(availableProjects)
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState<
    ProjectType[]
  >([])

  // const [serviciosSeleccionados, setServiciosSeleccionados] = useState<
  //   string[]
  // >([])

  useEffect(() => {
    setFuncionesDisponibles(availableFunctions)
    setMapsDisponibles(availableMaps)
    setCentersDisponibles(availableCenters)
    setPermisosDisponibles(availablePermissions)
    setProyectosDisponibles(availableProjects)
  }, [
    availableFunctions,
    availableMaps,
    availableCenters,
    availablePermissions,
    availableProjects,
  ])

  // const [serviciosDisponibles, setServiciosDisponibles] = useState([
  //   'SGIO',
  //   'Análisis Redesmx',
  //   'ANFmxd',
  //   'Catastro Comercial',
  //   'AguaPotable',
  //   'Satélite ESRI',
  //   'Alcantarillado',
  //   'Curvas de Nivel',
  //   'Red Vial',
  //   'Mapa Base',
  //   'TIN',
  //   'Consulta Redesmx',
  //   'Gestión Comercialmx',
  //   'Supervisor Edicion ArcSDEmx',
  // ])

  const onSubmitNewProduct = async (data: InsertProfileType) => {
    console.log('Función IDs seleccionadas:', data.funciones)
    await onSubmit(data)
    reset()
  }

  //   const onSubmitNewProduct = async (data: InsertProfileType) => {
  //   const funcionesSeleccionadasIds = data.funciones.map((funcion: FunctionType) => funcion.idFuncion);
  //   console.log('IDs de las funciones seleccionadas:', funcionesSeleccionadasIds);

  //   await onSubmit(data);
  //   reset();
  // }

  return (
    <Dialog
      header="Crear Perfil"
      visible={isModalOpen}
      maximizable
      style={{ width: '60vw' }}
      onHide={() => {
        if (!isModalOpen) return
        onIsModalOpen(false)
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmitNewProduct)}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        {/* Inputs de la cabecera */}
        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label htmlFor="nombre">Nombre del perfil: </label>
            <InputText
              id="nombre"
              style={{ width: '60%' }}
              {...register('nombrePerfil', {
                required: 'Ingrese nombre del perfil',
              })}
              className="p-inputtext-sm"
            />
            {errors.nombrePerfil && (
              <small
                className="p-error"
                style={{ display: 'block', marginTop: '5px' }}
              >
                {errors.nombrePerfil.message}
              </small>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="descripcion">Descripción: </label>
            <InputText
              id="descripcion"
              style={{ width: '60%' }}
              {...register('descripcion', {
                required: 'Ingrese la descripción del perfil',
              })}
              className="p-inputtext-sm"
            />
            {errors.descripcion && (
              <small
                className="p-error"
                style={{ display: 'block', marginTop: '5px' }}
              >
                {errors.descripcion.message}
              </small>
            )}
          </div>
        </div>
        {/* Divisiones para los listados de Funciones */}
        {/* <DualListBox
          disponibles={funcionesDisponibles}
          seleccionados={funcionesSeleccionados}
          setDisponibles={setFuncionesDisponibles}
          setSeleccionados={setFuncionesSeleccionados}
          tituloDisponibles="Funciones Disponibles"
          tituloSeleccionados="Funciones Asignadas"
          labelFieldName="nombreFuncion"
        ></DualListBox> */}
        <FormDualListBox
          name="funciones" // El nombre que usará react-hook-form para el campo
          label="Funciones Asignadas"
          control={control} // Control de react-hook-form
          errors={errors} // Errores de validación de react-hook-form
          disponibles={funcionesDisponibles}
          seleccionados={funcionesSeleccionados}
          setDisponibles={setFuncionesDisponibles}
          setSeleccionados={setFuncionesSeleccionados}
          labelFieldName="nombreFuncion"
          tituloDisponibles="Funciones Disponibles"
          tituloSeleccionados="Funciones Asignadas"
        />

        {/* Divisiones para los listados de Mapas */}
        <DualListBox
          disponibles={mapasDisponibles}
          seleccionados={mapasSeleccionados}
          setDisponibles={setMapsDisponibles}
          setSeleccionados={setMapasSeleccionados}
          tituloDisponibles="Mapas Disponibles"
          tituloSeleccionados="Mapas Asignados"
          labelFieldName="nombreMapa"
        />
        {/* Divisiones para los listados de Zonas */}
        <DualListBox
          disponibles={centersDisponibles}
          seleccionados={centersSeleccionados}
          setDisponibles={setCentersDisponibles}
          setSeleccionados={setCentersSeleccionados}
          tituloDisponibles="Zonas Disponibles"
          tituloSeleccionados="Zonas Asignadas"
          labelFieldName="name"
        />

        {/* Divisiones para los listados de Permisos */}
        <DualListBox
          disponibles={permisosDisponibles}
          seleccionados={permisosSeleccionados}
          setDisponibles={setPermisosDisponibles}
          setSeleccionados={setPermisosSeleccionados}
          tituloDisponibles="Permisos Disponibles"
          tituloSeleccionados="Permisos Asignados"
          labelFieldName="nombre"
        />

        {/* Divisiones para los listados de Tipos de Edicion */}
        <DualListBox
          disponibles={proyectosDisponibles}
          seleccionados={proyectosSeleccionados}
          setDisponibles={setProyectosDisponibles}
          setSeleccionados={setProyectosSeleccionados}
          tituloDisponibles="Tipos de Edicion Disponibles"
          tituloSeleccionados="Tipos de Edicion Asignados"
          labelFieldName="name"
        />
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
      </form>
    </Dialog>
  )
}
