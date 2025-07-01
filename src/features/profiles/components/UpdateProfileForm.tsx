import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import type {
  FunctionType,
  PermissionsType,
  Profile,
  ProjectType,
} from '../types/profileType'
import type { Map } from '../../maps/types/mapType'
import type { CentersType } from '../../teams/types/centersType'
import { useEffect, useState } from 'react'
import { DualListBox } from '../../../shared/components/form/DualListBox'
import {
  getCentersById,
  getFuncionesById,
  getMapsById,
  getPermisosById,
  getProyectosById,
} from '../apis/profileApi'
import { FormInput } from '../../../shared/components/form/FormInput'
import type { ProfileIns } from '../types/profileInsType'

interface UpdateProfileFormProps {
  availableFunctions: FunctionType[]
  availableMaps: Map[]
  availableCenters: CentersType[]
  availablePermissions: PermissionsType[]
  availableProjects: ProjectType[]
  currentProfile: Profile
  // onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: ProfileIns) => Promise<void>
  handleClose: () => void
}

export const UpdateProfileForm = ({
  availableFunctions,
  availableMaps,
  availableCenters,
  availablePermissions,
  availableProjects,
  currentProfile: currentProfile,
  // isModalOpen,
  // onIsModalOpen,
  handleClose,
  onSubmit,
}: UpdateProfileFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Profile>({
    mode: 'onBlur',
    defaultValues: currentProfile,
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
  const [centersSeleccionados, setCentersSeleccionados] = useState<
    CentersType[]
  >([])

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

  // Estados para saber si los datos han sido cargados
  const [isLoading, setIsLoading] = useState(true)

  if (currentProfile) {
    useEffect(() => {
      const fetchAttributes = async () => {
        try {
          const assignedFunctions = await getFuncionesById(
            currentProfile.idPerfil
          )
          const assignedMaps = await getMapsById(currentProfile.idPerfil)
          const assignedCenters = await getCentersById(currentProfile.idPerfil)
          const assignedPermissions = await getPermisosById(
            currentProfile.idPerfil
          )
          const assignedProjects = await getProyectosById(
            currentProfile.idPerfil
          )

          setFuncionesSeleccionados(assignedFunctions)
          setMapasSeleccionados(assignedMaps)
          setCentersSeleccionados(assignedCenters)
          setPermisosSeleccionados(assignedPermissions)
          setProyectosSeleccionados(assignedProjects)
          setIsLoading(false)
        } catch (error) {
          console.error('Error loading data:', error)
          setIsLoading(false)
        }
      }
      fetchAttributes()
    }, [])
  }
  if (isLoading) {
    return <div>Loading...</div> // Puedes usar un spinner o cualquier otro indicador de carga
  }

  const toProfileIns = (raw: Profile): ProfileIns => ({
    nombrePerfil: raw.nombrePerfil,
    descripcion: raw.descripcion,
    funciones: funcionesSeleccionados.map((f) => f.idFuncion),
    mapas: mapasSeleccionados.map((m) => m.idMapa),
    permisos: permisosSeleccionados.map((p) => p.idPermiso),
    proyectos: proyectosSeleccionados.map((p) => p.idProyecto),
    zonas: centersSeleccionados.map((c) => c.id),
  })

  const onSubmitNewProduct = async (data: Profile) => {
    // crear objeto de tipo ProfileIns

    var profileIns = toProfileIns(data)
    await onSubmit(profileIns)
    reset()
  }

  return (
    <Dialog
      header="Crear Perfil"
      visible={true}
      maximizable
      style={{ width: '60vw' }}
      onHide={() => {
        handleClose()
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmitNewProduct)}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <FormInput
          name="nombrePerfil"
          label="Nombre del Perfil:"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese nombre del perfil' }}
        />
        <FormInput
          name="descripcion"
          label="Descripción"
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese descripción del perfil' }}
        />

        {/* Divisiones para los listados de Funciones */}
        <DualListBox
          disponibles={funcionesDisponibles}
          seleccionados={funcionesSeleccionados}
          setDisponibles={setFuncionesDisponibles}
          setSeleccionados={setFuncionesSeleccionados}
          tituloDisponibles="Funciones Disponibles"
          tituloSeleccionados="Funciones Asignadas"
          labelFieldName="nombreFuncion"
        ></DualListBox>

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
            onClick={() => handleClose()}
          />
          <Button
            disabled={!isValid || isSubmitting}
            label="Actualizar Perfil"
            type="submit"
            icon="pi pi-save"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
