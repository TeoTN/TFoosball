import React from 'react';
import { Panel, Grid, Row } from 'react-bootstrap';
import TeamCreationForm from './TeamCreationForm';

export default (props) =>
    <Grid>
        <Row>
            <Panel>
                <h1>Welcome!</h1>
                <p>
                    We've noticed that you don't belong to any team. You can create one or join to existing one.
                </p>
                <h3>Create team:</h3>
                <TeamCreationForm />
                <h3>Join existing one:</h3>
                {props.children}
            </Panel>
        </Row>
    </Grid>