import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PyramidSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
  AccumulationSelection
} from "@syncfusion/ej2-react-charts";

import { PyramidData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../context/ContextProvider";

function Pyramid() {
  const { currentMode } = useStateContext();
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Chart" title="Food Comparison Chart" />
      <div className="w-full">
        <AccumulationChartComponent
          id="pyramid-chart"
          legendSettings={{
            background: "#33373E",
            textStyle: { color: `#999999` },
          }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
          tooltip={{ enable: true }}
        >
          <Inject
            services={[
              AccumulationLegend,
              PyramidSeries,
              AccumulationDataLabel,
              AccumulationTooltip,
              AccumulationSelection
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              name="Food"
              dataSource={PyramidData}
              xName="x"
              yName="y"
              type="Pyramid"
              width="45%"
              height="80%"
              neckWidth="15%"
              radius="70%"
              explode
              gapRatio={0.3}
              emptyPointSettings={{mode:'Drop', fill:'red'}}
              dataLabel={{
                visible: true,
                name: "text",
                position: "Inside",
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
}

export default Pyramid;
