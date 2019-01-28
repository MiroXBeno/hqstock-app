import React, { memo } from 'react';
import PortfolioAnalytics from 'portfolio-analytics';
import '../styles/KPIs.css';

export interface IKPIsProps {
    stockValues?: number[]; 
}

export const KPIs = (props: IKPIsProps) => {
    let maxDrawdown = 0; 
    let simpleReturn = 0; 
    if (props.stockValues && props.stockValues.length > 0) {
        maxDrawdown = PortfolioAnalytics.maxDrawdown(props.stockValues);
        simpleReturn = PortfolioAnalytics.cumulativeReturn(props.stockValues);
    }

    return (
        <div className="kpis">           
            <div className="kpis__box">
                <span className="kpis__label">{"Maximum drawdown: "}</span>
                <span className="kpis__value">{(maxDrawdown * 100).toFixed(2) + "%"}</span>       
            </div>       
            <div className="kpis__box">
                <span className="kpis__label">{"Simple return: "}</span>
                <span className="kpis__value">{(simpleReturn * 100).toFixed(2) + "%"}</span>       
            </div>  
        </div>
    );
};

export default memo(KPIs);     // pure component, change reference to array, if rerender needed
