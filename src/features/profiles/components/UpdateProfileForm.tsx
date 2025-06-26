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
import { InputText } from 'primereact/inputtext'
import type { CentersType } from '../../teams/types/centersType'
import { useState } from 'react'
import { DualListBox } from '../../../shared/components/form/DualListBox'

interface UpdateProfileFormProps {
  availableFunctions: FunctionType[]
  availableMaps: Map[]
  availableCenters: CentersType[]
  availablePermissions: PermissionsType[]
  availableProjects: ProjectType[]
  currentService: Profile
  // onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: Profile) => Promise<void>
  handleClose: () => void
}

export const UpdateProfileForm = ({
  availableFunctions,
  availableMaps,
  availableCenters,
  availablePermissions,
  availableProjects,
  currentService,
  // isModalOpen,
  // onIsModalOpen,
  handleClose,
  onSubmit,
}: UpdateProfileFormProps) => {
  const {
    // control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    register,
  } = useForm<Profile>({
    mode: 'onBlur',
    defaultValues: currentService,
  })

  const onSubmitNewProduct = async (data: Profile) => {
    await onSubmit(data)
    reset()
  }

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
        {/* Inputs de la cabecera */}
        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label htmlFor="nombre">Nombre del perfil: </label>
            <InputText
              id="nombre"
              style={{ width: '60%' }}
              //   name="nombre"
              //   control={control}
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
              //   name="descripcion"
              //   control={control}
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
