import React from 'react'
import{ pieChartData } from '../../data/dummy'

import {Header, Pie as PieChart} from "../../components"
import { useStateContext } from "../../context/ContextProvider";

function Pie() {
  const { currentMode } = useStateContext();
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <Header  category="Chart" title="Project Cost Breakdown"/>
    <div className='w-full'>
      <PieChart id="chart-pie" data={pieChartData} legendVisibility  background={currentMode === "Dark" ?  "#33373E" : "#fff"} height="full"/>
    </div>

    </div>
  )
}

export default Pie