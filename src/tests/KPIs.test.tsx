import React from 'react';
import { shallow } from 'enzyme';
import {KPIs} from '../components/KPIs';

it('renders zero KPIs for no input stock values', () => {
  const component = shallow(<KPIs />);

  expect(component.text()).toEqual("Maximum drawdown: 0.00%Simple return: 0.00%");
});

it('renders KPIs from stock values', () => {
    const component = shallow(<KPIs stockValues={[500, 750, 400, 600, 350, 800]} />);
    
    expect(component.text()).toEqual("Maximum drawdown: 53.33%Simple return: 60.00%");
  });
  
