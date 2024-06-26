import React from 'react'
import { Header } from "../components"
import NewTask from '../features/tasks/NewTask'
function NewTaskFormPage() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:text-white dark:bg-secondary-dark-bg">
    <Header category="Page" title="Create New Task"/>
    <NewTask/>
    </div>
  )
}

export default NewTaskFormPage