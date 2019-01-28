import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';
import 'jest-enzyme';
import 'jest-date-mock';
 
configure({ adapter: new Adapter() });

(global as any).URL = { createObjectURL: () => {}};
global.fetch = require('jest-fetch-mock');