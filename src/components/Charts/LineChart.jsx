import React from 'react'
import { SeriesDirective, SeriesCollectionDirective, ChartComponent, Legend, Tooltip, Inject, DateTime, LineSeries} from "@syncfusion/ej2-react-charts"

import {lineCustomSeries, LinePrimaryYAxis, LinePrimaryXAxis } from "../../data/dummy"

import { useStateContext }  from "../../context/ContextProvider"

function LineChart() {

  const { currentMode } = useStateContext()
  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{border : {width:0}}}
      tooltip={{enable: true}}
      background= {currentMode === 'Dark' ? '#33373E' : '#fff'}
    >
    <Inject className="dark:text-white" services={[LineSeries, Legend, DateTime, Tooltip]}/>
    <SeriesCollectionDirective>
      {lineCustomSeries.map((item, index) =>
      <SeriesDirective  key={index} {...item}/> 
      )}
    </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default LineChart