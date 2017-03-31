import React from 'react'
import { ListGroupItem } from 'react-bootstrap';
import Icon from 'react-fontawesome';

const SelectTeamItem = ({team, onSelect, selected, editable}) => {
    const {name} = team;
    return (
        <ListGroupItem onClick={(...args) => !selected ? onSelect(args) : null} disabled={selected}>
            <span className="pull-left">{name}</span>
            <Icon
                name={ editable ? "sign-out" : "chevron-right" }
                className={`pull-right ${ editable ? "text-danger" : "text-muted"}`}
                style={{paddingTop: '5px'}} />
        </ListGroupItem>
    );
};

export default SelectTeamItem;
