import React from 'react';
import { shallow } from 'enzyme';
import PlayResult from '../play/components/PlayResult';
import { FormControl } from 'react-bootstrap';


describe('PlayResult component', () => {
    it('should render two numeric inputs', () => {
        const component = shallow(<PlayResult/>);
        const inputs = component.find(FormControl);
        expect(inputs).toHaveLength(2);
        expect(inputs.first().prop('type')).toEqual('number');
        expect(inputs.last().prop('type')).toEqual('number');
    });
});
