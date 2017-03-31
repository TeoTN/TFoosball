import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { requestJoinTeam } from '../../teams/teams.actions.js';

const mapDispatchToProps = (dispatch) => ({
    joinTeam: (team, username) => dispatch(requestJoinTeam(team, username)),
});

@connect(null, mapDispatchToProps)
export default class JoinTeamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: '',
            username: '',
        };
    }

    handleJoinTeam = () => {
        const { joinTeam } = this.props;
        const { team, username } = this.state;
        joinTeam(team, username);
    };

    handleChange = (field) => (event) => {
        this.setState({ [field]: event.target.value });
    };

    render() {
        return (
            <Form>
                <FormGroup>
                    <Row>
                        <Col xs={3}>
                            <FormControl
                                placeholder="Username"
                                onChange={this.handleChange('username')}
                                value={this.state.username}
                            />
                        </Col>
                        <Col xs={3}>
                            <FormControl
                                placeholder="Team name"
                                onChange={this.handleChange('team')}
                                value={this.state.team}
                            />
                        </Col>
                        <Button bsStyle="success" onClick={this.handleJoinTeam}>Join team!</Button>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h6>You will have to wait for somebody to accept your invitation</h6>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        );
    }
}
