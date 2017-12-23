import React from 'react';
import { render } from 'enzyme';
import MatchItem from '../matches/components/MatchItem';

const mockMatch = (red_def, red_att, blue_att, blue_def, red_score, blue_score) => ({
    red_def,
    red_att,
    blue_att,
    blue_def,
    red_score,
    blue_score,
    points: red_score > blue_score ? 15 : -15,
});

describe('MatchItem component in ProfileMatches', () => {
    const username = 'AHobbit1';

    it('should display correct exp for user at red_def won', () => {
        const match = mockMatch(username, 'BSauron2', 'CSaruman3', 'DGandalf4', 10, 5);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('15xp');
    });

    it('should display correct exp for user at red_def lost', () => {
        const match = mockMatch(username, 'BSauron2', 'CSaruman3', 'DGandalf4', 5, 10);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('-15xp');
    });

    it('should display correct exp for user at red_att won', () => {
        const match = mockMatch('BSauron2', username, 'CSaruman3', 'DGandalf4', 10, 5);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('15xp');
    });

    it('should display correct exp for user at red_att lost', () => {
        const match = mockMatch('BSauron2', username, 'CSaruman3', 'DGandalf4', 5, 10);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('-15xp');
    });

    it('should display correct exp for user at blue_att won', () => {
        const match = mockMatch('BSauron2', 'CSaruman3', username, 'DGandalf4', 5, 10);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('15xp');
    });

    it('should display correct exp for user at blue_att lost', () => {
        const match = mockMatch('BSauron2', 'CSaruman3', username, 'DGandalf4', 10, 5);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('-15xp');
    });

    it('should display correct exp for user at blue_def won', () => {
        const match = mockMatch('BSauron2', 'CSaruman3', 'DGandalf4', username, 5, 10);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('15xp');
    });

    it('should display correct exp for user at blue_def lost', () => {
        const match = mockMatch('BSauron2', 'CSaruman3', 'DGandalf4', username, 10, 5);
        const component = render(
            <MatchItem match={match} signed onRemove={()=>{}} username={username} />
        );
        expect(component.find('.points').text()).toEqual('-15xp');
    });
});