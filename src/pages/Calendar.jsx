import React from 'react'
import { Header } from "../components"
import ScheduleList from "../features/schedule/ScheduleList";


function Calendar() {

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
    <Header category="App" title="Calendar"/>
   <ScheduleList/>
    </div>
  )
}

export default Calendar