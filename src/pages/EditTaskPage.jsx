import React from 'react'
import { Header } from "../components"
import EditTask from '../features/tasks/EditTask'

function EditTaskPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:text-white dark:bg-secondary-dark-bg">
    <Header category="Page" title="Edit Task"/>
    <EditTask/>
    </div>
  )
}

export default EditTaskPage