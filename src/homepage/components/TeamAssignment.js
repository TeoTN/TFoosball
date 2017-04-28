import React from 'react';
import {Panel, Grid, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import TeamCreationForm from './TeamCreationForm';
import JoinTeamForm from '../../teams/components/JoinTeamForm';

const mapStateToProps = ({teams}) => ({
    my_pending: teams.my_pending,
});

const TeamAssignment = (props) => (
    <Grid>
        <Row>
            <Panel>
                <h1>Welcome!</h1>
                <p>
                    We've noticed that you don't belong yet to any team. You can create one or join to existing one.
                </p>

                {
                    props.my_pending > 0 ?
                        <h5>Number of pending join requests: <span className="text-info h4">{props.my_pending}</span></h5> :
                        null
                }
                <h3>Create team:</h3>
                <TeamCreationForm />
                <h3>Join existing one:</h3>
                <JoinTeamForm />
                {props.children}
            </Panel>
        </Row>
    </Grid>
);

export default connect(mapStateToProps, null)(TeamAssignment);