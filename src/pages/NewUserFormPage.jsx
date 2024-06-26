import React from 'react'
import NewUserForm from "../features/users/NewUserForm";
import { Header } from "../components"

function NewUserFormPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:text-white dark:bg-secondary-dark-bg">
    <Header category="Page" title="Create New User"/>
    <NewUserForm/>
  </div>
  )
}

export default NewUserFormPage