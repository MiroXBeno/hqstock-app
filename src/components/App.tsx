import React, { Component } from 'react';
import {IQuandlSuccessResponse, IQuandlErrorResponse, IDataset} from '../types';
import {Config} from '../Config';
import {Utils} from '../Utils';
import Header from './Header';
import Graph from './Graph';
import KPIs from './KPIs';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import memoize from "memoize-one";
import 'normalize.css';
import 'react-notifications/lib/notifications.css';
import '../styles/App.css';

interface IAppState {
  dataset?: IDataset;
  loading?: boolean;
}

class App extends Component<{}, IAppState> {
  state: IAppState = {
    loading: false
  }

  fetchApiData = (stockSymbol: string, startDate: string) => {
    let today = new Date();
    let todayDateString = Utils.getDateString(today);
    let url = Config.getApiUrl(startDate, todayDateString, stockSymbol);

    this.setState({loading: true});
    fetch(url)
      .then(response => response.json())
      .then(this.saveApiData)
      .catch(error => {
          this.handleError(error.message);
      });
  }

  saveApiData = (apiData: IQuandlSuccessResponse & IQuandlErrorResponse) => {
    if (!apiData || !apiData.dataset || !apiData.dataset.column_names || !apiData.dataset.data) {
        this.handleError(apiData && apiData.quandl_error && apiData.quandl_error.message || "Invalid data received");
        return;
    }
    if (apiData.dataset.data.length == 0) {
      this.handleError("No data received");
      return;
    }
    this.setState({dataset: apiData.dataset, loading: false});
  }  

  handleError = (error: string) => {
    NotificationManager.error(error, 'Error loading data', 10000);
    this.setState({dataset: undefined, loading: false}); 
  }

  parseValuesFromApiData = memoize(
    (dataset?: IDataset) => {                                                               
      if (!dataset)
        return {dateValues: [], adjCloseValues: []};

      let dateIndex = dataset.column_names.indexOf("Date");
      let adjCloseIndex = dataset.column_names.indexOf("Adj_Close");

      // we expect data to arrive sorted from newest to oldest
      let dateValues = dataset.data.map(arrayOfData => arrayOfData[dateIndex]).reverse();
      let adjCloseValues = dataset.data.map(arrayOfData => arrayOfData[adjCloseIndex]).reverse();

      return {dateValues, adjCloseValues};
    }
  );

  updateWindowDimensions = () => {
      this.forceUpdate();
  }

  componentDidMount() {
      window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {   
    let {dateValues, adjCloseValues} = this.parseValuesFromApiData(this.state.dataset); 

    return (
      <div className="app">
        <Header onRequestData={this.fetchApiData} loading={this.state.loading}/>
        <Graph stockValues={adjCloseValues} dateValues={dateValues} datasetName={this.state.dataset && this.state.dataset.name}/>
        <KPIs stockValues={adjCloseValues} />        
        <footer>
          Copyright © 2019 Miroslav Beno
        </footer>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
