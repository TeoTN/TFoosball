import React from "react"
import { MenuItem, Dropdown, Glyphicon, Label } from "react-bootstrap";

const SelectTeamItem = ({team, onSelect, isSelected, isDefault, onLeave, onMakeDefault}) => {
    const {name, username} = team;
    return (
        <tr className={`club-item ${isSelected ? 'active' : ''}`}>
            <td className="text-ellipsis">
                <span>{name}&nbsp;&nbsp;</span>
                {isDefault && <Label bsStyle="primary">Default</Label>}
            </td>
            <td className="text-ellipsis">{username}</td>
            <td>
                <Dropdown bsSize="xsmall" id={`team-${name}-options`} pullRight>
                    <Dropdown.Toggle bsStyle="link" noCaret>
                        <Glyphicon glyph="option-vertical" className="text-muted"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem header>{name.toUpperCase()}</MenuItem>
                        <MenuItem eventKey="1" className="small"
                                  disabled={isSelected}
                                  onSelect={() => onSelect(team)}>
                            Select
                        </MenuItem>
                        <MenuItem eventKey="2" className="small" disabled>
                            View members
                        </MenuItem>
                        <MenuItem eventKey="3" className="small"
                                  disabled={isDefault}
                                  onSelect={() => onMakeDefault(team)}>
                            Mark as default
                        </MenuItem>
                        <MenuItem eventKey="4" className="small"
                                  disabled={isSelected}
                                  onSelect={() => onLeave(team)}>
                            Leave
                        </MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
};

export default SelectTeamItem;
