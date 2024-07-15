import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

const UserTable = ({ users }) => {
    return (
        <div>
            <DataTable value={users} size='small' paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='custom-header' emptyMessage="No users found.">
                <Column field="name" header="Name" />
                <Column field="email" header="Email" />
                <Column field="phone" header="Phone" />
                <Column field="role" header="Role" />
                <Column field="status" header="Status" />
            </DataTable>
        </div>
    )
}

export default UserTable