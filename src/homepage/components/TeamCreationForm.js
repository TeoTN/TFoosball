import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import {requestCreateTeam} from '../../shared/teams/teams.actions.js';

const mapDispatchToProps = (dispatch) => ({
    createTeam: (team, username) => dispatch(requestCreateTeam(team, username)),
});

@connect(null, mapDispatchToProps)
export default class TeamCreationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: '',
            username: '',
        };
    }

    handleCreateTeam = () => {
        const {createTeam} = this.props;
        const {team, username} = this.state;
        createTeam(team, username);
    };

    handleChange = (field) => (event) => {
        this.setState({[field]: event.target.value});
    };

    render() {
        return (
            <Form>
                <FormGroup>
                    <Row>
                        <Col xs={12} sm={3}>
                            <FormControl
                                placeholder="Username"
                                onChange={this.handleChange('username')}
                                value={this.state.username}
                            />
                        </Col>
                        <Col xs={12} sm={3}>
                            <FormControl
                                placeholder="Team name"
                                onChange={this.handleChange('team')}
                                value={this.state.team}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <Button bsStyle="success" onClick={this.handleCreateTeam}>Create a new team</Button>
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
    }
}
