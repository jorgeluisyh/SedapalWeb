import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { Card } from 'primereact/card'

export const Userpage = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('')

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
        <Button type="button" icon="pi pi-plus" label="Nuevo usuario" />
      </div>
    )
  }

  return (
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
  )
}
