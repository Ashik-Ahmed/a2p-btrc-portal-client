import React from 'react'

const ManageUsersPage = async () => {

    const userData = await fetch('http://localhost:5000/api/v1/user', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })

    const users = await userData.json();
    console.log(users);

    return (
        <div>ManageUsersPage</div>
    )
}

export default ManageUsersPage