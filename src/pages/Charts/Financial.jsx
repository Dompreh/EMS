import React from "react";
import {
  HiloSeries,
  Tooltip,
  DateTime,
  Zoom,
  Logarithmic,
  Crosshair,
  ChartComponent,
  Inject,
  SeriesCollectionDirective,
  Legend,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";
import {
  financialChartData,
  FinancialPrimaryYAxis,
  FinancialPrimaryXAxis,
} from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";
import { Header } from "../../components";

const date1 = new Date("2017, 1, 1");

function filterValue(value) {
  if (value.x >= date1) {
    return value.x, value.high, value.low;
  }
}

const returnValue = financialChartData.filter(filterValue);

function Financial() {
  const { currentMode } = useStateContext();
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Financial" title="ALPE Historical" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
          crosshair={{ enable: true, lineType: "Vertical", line: { width: 0 } }}
        >
          <Inject
          
            services={[
              HiloSeries,
              Logarithmic,
              DateTime,
              Tooltip,
              Crosshair,
              Zoom,
              Legend,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={returnValue}
              xName="x"
              yName="low"
              name="ALPE Inc"
              type="Hilo"
              low="low"
              high="high"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}

export default Financial;
