/// <reference types="react-scripts" />

declare module 'portfolio-analytics' {
    interface IPortfolioAnalytics {
        maxDrawdown: (data: Array<number>) => number;
        cumulativeReturn: (data: Array<number>) => number;
        /// ...
    };

    const PortfolioAnalytics: IPortfolioAnalytics;
    export default PortfolioAnalytics;
  }

  declare module 'react-notifications' {
    /// ...
    export const NotificationManager: any;
    export const NotificationContainer: any;
  }