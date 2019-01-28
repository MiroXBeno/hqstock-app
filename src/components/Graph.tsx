import React from 'react';
import Plot from 'react-plotly.js';
import {Config} from '../Config';

export interface IGraphProps {
    stockValues?: number[];       
    dateValues?: string[];
    datasetName?: string;
}

const Graph = (props: IGraphProps) => {
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
            width: window.innerWidth - 20,            // TODO: replace with better configuration
            height: (window.innerHeight / 4 * 3),     
            title: (props.datasetName || "N/A") + " - Adjusted closed prices",
            font: { family: `"Helvetica Neue","Helvetica Neue HQ",Helvetica,Arial,sans-serif`, size: 15 }
          }}
        />
    );
};

export default Graph;
