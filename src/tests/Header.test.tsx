import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

it('renders form for submitting stock data', () => {
    const component = shallow(<Header onRequestData={()=>{}}/>);

    expect(component).toContainMatchingElement('input[type="date"]');
    expect(component).toContainMatchingElement('input[type="text"]');
    expect(component).toContainMatchingElement('button');
});

it('renders 2 logos', () => {
    const component = shallow(<Header onRequestData={()=>{}}/>);

    expect(component.find('img')).toHaveLength(2);
});

it('renders disabled submit button if data is already loading', () => {
    const component = shallow(<Header onRequestData={()=>{}} loading={true}/>);

    expect(component.find('button')).toBeDisabled();
});

it('renders disabled submit button if stock symbol or start date are not entered', () => {
    const component = shallow(<Header onRequestData={()=>{}}/>);
    component.setState({
        stockSymbol: "",
        startDate: ""        
    });

    expect(component.find('button')).toBeDisabled();
});

it('calls callback on submitting the form', () => {
    const mockCallback = jest.fn();    
    const component = shallow(<Header onRequestData={mockCallback}/>);
    component.setState({
        stockSymbol: "AAPL",
        startDate: "2019-01-01"        
    });
    const mockEvent = { preventDefault: ()=>{} };

    component.find('form').simulate('submit', mockEvent);

    expect(mockCallback.mock.calls).toEqual([ [ 'AAPL', '2019-01-01' ] ]);
});

it('prevents refresh on submitting the form', () => {
    const component = shallow(<Header onRequestData={()=>{}}/>);
    const mockCallback = jest.fn();    
    const mockEvent = { preventDefault: mockCallback };

    component.find('form').simulate('submit', mockEvent);

    expect(mockCallback).toHaveBeenCalled();
});

