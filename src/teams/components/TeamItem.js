import React from 'react'
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

const TeamItem = ({team, onSelect, selected}) => {
    const {name} = team;
    return (
        <ListGroupItem onClick={(...args) => !selected ? onSelect(args) : null} disabled={selected}>
            {name}
            <Glyphicon glyph="menu-right" className="pull-right text-muted" />
        </ListGroupItem>
    );
};

export default TeamItem;
