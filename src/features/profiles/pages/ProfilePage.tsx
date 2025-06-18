import { useState } from 'react'
import { Card } from 'primereact/card'
import type { Profile } from '../types/profileType'
import { ProfileTable } from '../components/ProfileTable'
import { NewProfileForm } from '../components/NewProfileForm'

export const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateProduct = async (profile: Profile) => {
    //create tu metodo para guardar usuario con un api bicho
    console.log(profile.nombre)
  }

  const data = [
    {
      id: 1,
      nombre: 'Alta Asistida Suministros',
      descripcion: 'Alta Asistida Suministros - Editor',
    },
    {
      id: 2,
      nombre: 'Analisis Comercial',
      descripcion:
        'Web Perfil Analista - Temáticos de la Información del Catastro Comercial ',
    },
  ]

  return (
    <>
      <Card title="Perfiles">
        <ProfileTable data={data} onAddClick={() => setIsModalOpen(true)} />
      </Card>
      <NewProfileForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
