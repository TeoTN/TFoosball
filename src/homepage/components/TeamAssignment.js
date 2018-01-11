import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import JoinTeamForm from '../../teams/components/JoinTeamForm';
import { fetchAutocompletion, requestCreateTeam, requestJoinTeam } from "../../teams/teams.actions";
import { getAutocompletionState, getMyRequestsPending } from "../../teams/teams.reducer";
import CreateTeamForm from "../../teams/components/CreateTeamForm";

const mapStateToProps = (state) => ({
    myPending: getMyRequestsPending(state),
    autocompletion: getAutocompletionState(state),

});

const mapDispatchToProps = (dispatch) => ({
    createTeam: (team, username) => dispatch(requestCreateTeam(team, username)),
    joinTeam: ({name: {value}, username}) => dispatch(requestJoinTeam(value, username)),
    fetchAutocompletion: (input) => {
        dispatch(fetchAutocompletion(input));
        return input;
    },
});

const TeamAssignment = ({myPending, createTeam, joinTeam, autocompletion, fetchAutocompletion}) => (
    <Grid>
        <Row>
            <Panel>
                <Col sm={8} smOffset={2}>
                <h1>Welcome!</h1>
                <hr />
                <p>
                    Your ultimate TFoosball adventure is about to start. Adventures though are the best when you share
                    them with your friends! To begin with, you may want to either
                    <span className="text-success"> create</span> or <span className="text-info">join</span> existing club.
                </p>
                {
                    myPending > 0 &&
                        <h5>Number of pending join requests: <span className="text-info h4">{myPending}</span></h5>
                }
                <h3>Create a club:</h3>
                <CreateTeamForm action={createTeam} />
                <hr />
                <h3>Join existing club:</h3>
                <JoinTeamForm
                    action={joinTeam}
                    autocompletion={autocompletion}
                    fetchAutocompletion={fetchAutocompletion}
                />
                </Col>
            </Panel>
        </Row>
    </Grid>
);

export default connect(mapStateToProps, mapDispatchToProps)(TeamAssignment);
