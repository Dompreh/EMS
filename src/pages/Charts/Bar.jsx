import React from 'react'
import {DataLabel, ColumnSeries, Category, ChartComponent, Inject,Legend, Tooltip, SeriesCollectionDirective, SeriesDirective} from'@syncfusion/ej2-react-charts';
import {
  barCustomSeries,
  barPrimaryYAxis,
  barPrimaryXAxis,
} from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";
import { Header} from "../../components"

function Bar() {
  const { currentMode } = useStateContext();
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <Header  category="Chart" title="Olympic Medal Counts - RIO"/>
    <div className='w-full'>
    <ChartComponent
        id="charts"
        height="420px"
        primaryXAxis={barPrimaryXAxis}
        primaryYAxis={barPrimaryYAxis}
        chartBar={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        background={currentMode === "Dark" ? "#33373E" : "#fff"}
        legendSettings ={{background : 'white'}}
      >
        <Inject
          className="dark:text-white"
          services={[ColumnSeries, Legend, DataLabel, Tooltip, Category]}
        />
        <SeriesCollectionDirective>
          {barCustomSeries.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
    
    </div>
  );
}

export default Bar;
