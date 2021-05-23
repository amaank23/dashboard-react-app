import React from 'react';
import ReactFC from "react-fusioncharts";

function BarChartWidget(props) {
    const chartConfigs = {
        type: "bar2d", // The chart type
        width: "100%", // Width of the chart
        height: "240", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            bgColor: '#ebebeb',
            theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: props.data
        }
      };
    return (
        <div className="barchart">
            <ReactFC {...chartConfigs} />
        </div>
    )
}

export default BarChartWidget
