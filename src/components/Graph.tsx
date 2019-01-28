import React from 'react';
import Plot from 'react-plotly.js';
import {Config} from '../Config';

export interface IGraphProps {
    stockValues?: number[];       
    dateValues?: string[];
    datasetName?: string;
}

const Graph = (props: IGraphProps) => {
    let datasetNameShortened = props.datasetName && props.datasetName.split("(")[0].trim();
    let graphWidth = document.documentElement.clientWidth - 20;  
    let graphHeight = (document.documentElement.clientHeight / 4 * 3);
    
    return (
        <Plot
          data={[
            {
              x: props.dateValues,
              y: props.stockValues,
              type: "scatter",
              mode: "lines+markers",
              marker: {color: Config.componentsMainColor},
            }
          ]}
          layout={{ 
            width: graphWidth,            
            height: graphHeight,   
            margin: { l: 60, r: 30, b: 80, t: 120, pad: 5 },
            title: (datasetNameShortened || ""),
            font: { family: `"Helvetica Neue","Helvetica Neue HQ",Helvetica,Arial,sans-serif`, size: 15 }
          }}
        />
    );
};

export default Graph;
