import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import TeamFormHOC from "../../teams/components/TeamFormHOC";


const TeamCreationForm = ({team, username, handleChange, handleAction}) => (
    <Form className="form-team-creation">
        <FormGroup>
            <Row>
                <Col xs={12} sm={12} md={3}>
                    <FormControl
                        placeholder="Username"
                        onChange={handleChange('username')}
                        value={username}
                    />
                </Col>
                <Col xs={12} sm={12} md={3}>
                    <FormControl
                        placeholder="Club name"
                        onChange={handleChange('team')}
                        value={team}
                    />
                </Col>
                <Col xs={12} sm={12} md={3} lg={2}>
                    <Button bsStyle="success" onClick={handleAction} block>Create a new club</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h6>We will ask you kindly to sign up with Google while proceeding</h6>
                </Col>
            </Row>
        </FormGroup>
    </Form>
);
export default TeamFormHOC(TeamCreationForm);
