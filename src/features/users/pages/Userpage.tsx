import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { NewUserForm } from '../components/NewUserForm'
import type { User } from '../types/userType'
import { getProducts } from '../../arcgisServices/apis/arcgisServiceApi'

export const Userpage = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState<User[]>([])

  const handleCreateProduct = async (user: User) => {
    //create tu metodo para guardar usuario con un api bicho
  }
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products)
    }
    fetchProducts()
  })

  const customers = [
    {
      id: '1',
      name: 'Amy Elsner',
      country: { name: 'Australia', code: 'AU' },
      company: 'Sons of Silva',
      status: 'active',
      age: 48,
    },
    {
      id: '1',
      name: 'Amy Elsner',
      country: { name: 'Australia', code: 'AU' },
      company: 'Sons of Silva',
      status: 'active',
      age: 48,
    },
    {
      id: '1',
      name: 'Amy Elsner',
      country: { name: 'Australia', code: 'AU' },
      company: 'Sons of Silva',
      status: 'active',
      age: 48,
    },
  ]

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={(e) => setGlobalFilterValue(e.target.value)}
            placeholder="Palabra clave"
          />
        </IconField>
        <Button
          onClick={() => setIsModalOpen(true)}
          type="button"
          icon="pi pi-plus"
          label="Nuevo usuario"
        />
      </div>
    )
  }

  return (
    <>
      {JSON.stringify(products)}
      <Card title="Usuarios">
        <DataTable
          header={renderHeader()}
          value={customers}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="name" header="Name" style={{ width: '25%' }}></Column>
          <Column
            field="country.name"
            header="Country"
            style={{ width: '25%' }}
          ></Column>
          <Column
            field="company"
            header="Company"
            style={{ width: '25%' }}
          ></Column>
          <Column
            field="age"
            header="Representative"
            style={{ width: '25%' }}
          ></Column>
        </DataTable>
      </Card>

      <NewUserForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
