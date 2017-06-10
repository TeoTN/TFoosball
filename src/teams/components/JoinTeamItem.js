import React from 'react';
import {
    ListGroupItem,
} from 'react-bootstrap';
import JoinTeamForm from './JoinTeamForm';


const JoinTeamItem = () => {
    return (
        <ListGroupItem className="no-padding">
            <JoinTeamForm/>
        </ListGroupItem>
    );
};

export default JoinTeamItem;
