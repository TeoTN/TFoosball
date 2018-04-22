import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import GlyphButton from "../../shared/components/GlyphButton";
import TeamFormHOC from "./TeamFormHOC";


const CreateTeamForm = ({team, username, handleChange, handleAction}) => (
    <Form horizontal>
        <FormGroup>
            <Col xsHidden sm={2} className="text-right">
                <ControlLabel>Club name</ControlLabel>
            </Col>
            <Col xs={12} sm={6}>
                <FormControl
                    placeholder="Enter club name..."
                    onChange={handleChange('team')}
                    value={team}
                />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col xsHidden sm={2} className="text-right">
                <ControlLabel>Nickname</ControlLabel>
            </Col>
            <Col xs={12} sm={6}>
                <FormControl
                    placeholder="Enter new username..."
                    onChange={handleChange('username')}
                    value={username}
                />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10}>
                <GlyphButton glyph="plus" bsSize="small" bsStyle="primary" onClick={handleAction}>
                    Create the club
                </GlyphButton>
            </Col>
        </FormGroup>
    </Form>
);

export default TeamFormHOC(CreateTeamForm);
