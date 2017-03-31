import React from 'react';
import { shallow } from 'enzyme';
import { Panel } from 'react-bootstrap';
import ProfileTeams from '../profile/components/ProfileTeams';


describe('Profile teams page', () => {
    describe('ProfileTeams component', () => {
        it('should render properly and consist of a Panel', () => {
            const component = shallow(<ProfileTeams />);
            expect(component.find(Panel)).toHaveLength(1);
        });
    });
});
