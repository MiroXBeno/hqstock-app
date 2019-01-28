import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {FetchMock} from "jest-fetch-mock";
import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import {Config} from '../Config';
import App from '../components/App';
import Header from '../components/Header';
import Graph from '../components/Graph';
import KPIs from '../components/KPIs';
import {NotificationContainer, NotificationManager} from 'react-notifications';


it('renders fully without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Header', () => {
  const app = shallow(<App />);
  expect(app.find(Header)).toExist();
});

it('renders Graph', () => {
  const app = shallow(<App />);
  expect(app.find(Graph)).toExist();
});

it('renders KPIs', () => {
  const app = shallow(<App />);
  expect(app.find(KPIs)).toExist();
});

it('renders footer', () => {
  const app = shallow(<App />);
  const footer = <footer>Copyright © 2019 HQ Trust, Miroslav Beno</footer>;
  expect(app).toContainReact(footer);
});

it('parses dates from dataset', () => {
  const appInstance = shallow(<App />).instance() as App; 
  let {dateValues, adjCloseValues} = appInstance.parseValuesFromApiData(sampleApiResult.dataset);
  expect(dateValues).toEqual(["2019-01-22", "2019-01-23", "2019-01-24"]);
});

it('parses stock values from dataset', () => {
  const appInstance = shallow(<App />).instance() as App; 
  let {dateValues, adjCloseValues} = appInstance.parseValuesFromApiData(sampleApiResult.dataset);
  expect(adjCloseValues).toEqual([177.11, 176.89, 177.29]);
});

it('fetches API data', () => {
  const fetchMock = (fetch as FetchMock);
  fetchMock.mockResponseOnce(JSON.stringify(sampleApiResult));
  advanceTo(new Date(2018, 9, 28));
  const app = shallow(<App />);
  const appInstance = app.instance() as App; 

  appInstance.fetchApiData("AAPL", "2018-01-01");
  
  expect(fetchMock.mock.calls.length).toEqual(1)
  const expectAPIString = Config.getApiUrl("2018-01-01", "2018-10-28", "AAPL");
  expect(fetchMock.mock.calls[0][0]).toEqual(expectAPIString);

  clear();
});

it('saves fetched API data to app state', done => {
  const fetchMock = (fetch as FetchMock);
  fetchMock.mockResponseOnce(JSON.stringify(sampleApiResult));
  const app = shallow(<App />);
  const appInstance = app.instance() as App; 

  appInstance.fetchApiData("AAPL", "2018-01-01");
  
  process.nextTick( ()=> {
    expect(app).toHaveState({dataset: sampleApiResult.dataset, loading: false});
    done();
  })  
});

it('resets loading state after failing to fetch data', done => {
    const fetchMock = (fetch as FetchMock);
    fetchMock.mockReject(new Error('Fetch failed'));
    const app = shallow(<App />);
    const appInstance = app.instance() as App; 
  
    appInstance.fetchApiData("AAPL", "2018-01-01");
    
    process.nextTick( ()=> {
      expect(app).toHaveState({dataset: undefined, loading: false});
      done();
    })  
  });

  it('shows error notification after failing to fetch data', done => {
    const fetchMock = (fetch as FetchMock);
    fetchMock.mockReject(new Error('Fetch failed'));
    const spy = jest.spyOn(NotificationManager, 'error');    
    const app = shallow(<App />);
    const appInstance = app.instance() as App; 
  
    appInstance.fetchApiData("AAPL", "2018-01-01");
    
    process.nextTick( ()=> {
      expect(spy).toHaveBeenCalled(); 
      spy.mockRestore();
      done();
    })  
  });

const sampleApiResult = {
  "dataset": {
    "id": 42635437,
    "dataset_code": "HD",
    "database_code": "EOD",
    "name": "Home Depot Inc. (The) (HD) Stock Prices, Dividends and Splits",
    "description": "",
    "refreshed_at": "2019-01-25 01:58:47 UTC",
    "newest_available_date": "2019-01-24",
    "oldest_available_date": "1981-09-22",
    "column_names": [
      "Date",
      "Open",
      "High",
      "Low",
      "Close",
      "Volume",
      "Dividend",
      "Split",
      "Adj_Open",
      "Adj_High",
      "Adj_Low",
      "Adj_Close",
      "Adj_Volume"
    ],
    "frequency": "daily",
    "type": "Time Series",
    "premium": true,
    "limit": null,
    "transform": null,
    "column_index": null,
    "start_date": "2019-01-22",
    "end_date": "2019-01-24",
    "data": [
      [
        "2019-01-24",
        177.0,
        177.53,
        175.3,
        177.29,
        3860309.0,
        0.0,
        1.0,
        177.0,
        177.53,
        175.3,
        177.29,
        3860309.0
      ],
      [
        "2019-01-23",
        176.59,
        178.06,
        174.53,
        176.89,
        4910402.0,
        0.0,
        1.0,
        176.59,
        178.06,
        174.53,
        176.89,
        4910402.0
      ],
      [
        "2019-01-22",
        177.49,
        178.6048,
        175.3626,
        177.11,
        6272715.0,
        0.0,
        1.0,
        177.49,
        178.6048,
        175.3626,
        177.11,
        6272715.0
      ]
    ],
    "collapse": null,
    "order": null,
    "database_id": 12910
  }
};