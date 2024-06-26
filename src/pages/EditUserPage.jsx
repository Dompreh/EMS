import React from 'react'
import EditUser from "../features/users/EditUser";
import { Header } from "../components"

function EditUserPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:text-white dark:bg-secondary-dark-bg">
    <Header category="Page" title="Edit User"/>
    <EditUser/>
  </div>
  )
}

export default EditUserPage