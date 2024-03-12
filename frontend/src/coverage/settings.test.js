import React from 'react';
import Enzyme,{ shallow,mount } from 'enzyme';
import Settings from '../components/userFeed/settings';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('should have a header with display: block', ()=>{
    const wrapper =shallow(<Settings />); // note `mount()`, not `shallow()`. 

    expect(wrapper.find({className:'.col-md-3 feed'}))

    
})