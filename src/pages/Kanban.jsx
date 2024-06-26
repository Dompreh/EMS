import React from 'react'
import { Header } from "../components"
import { useStateContext } from "../context/ContextProvider";
import KanbanList from "../features/kanban/KanbanList";
function Kanban() {
  const { currentMode } = useStateContext()


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:text-white dark:bg-secondary-dark-bg">
      <Header category="App" title="Kanban"/>
      <KanbanList/>
    </div>
  )
}

export default Kanban;
