import React from 'react'
import { ChartComponent, SeriesDirective, SeriesCollectionDirective, StackingColumnSeries, Inject, Legend, Category, Tooltip} from '@syncfusion/ej2-react-charts'

import { stackedColumnSeries, stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis} from "../../data/dummy"
import { useStateContext } from "../../context/ContextProvider"

function Stacked({width, height}) {
  const { currentMode } = useStateContext()
  return (
    <ChartComponent
    width={width}
    height={height}
    id="charts"
    primaryXAxis={stackedPrimaryXAxis}
    primaryYAxis={stackedPrimaryYAxis}
    chartArea={{border: {width: 0}}}
    tooltip={{enable: true}}
    background ={currentMode === "Dark" ? "#33373E" : "#fff"}
    legendSettings={{background: 'white'}}
    className="dark:bg-lightgray-500"
    >
      <Inject services={[Legend, Tooltip, StackingColumnSeries,Category]}/>
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item}/>)}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}
export default Stacked