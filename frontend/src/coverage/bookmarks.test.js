import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Bookmarks from '../components/userFeed/bookmarks';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<Bookmarks />);
    });
});