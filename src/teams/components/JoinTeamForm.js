import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, InputGroup, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import {requestJoinTeam} from '../teams.actions.js';
import Icon from 'react-fontawesome';


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
        const {joinTeam} = this.props;
        const {team, username} = this.state;
        joinTeam(team, username);
    };

    handleChange = (field) => (event) => {
        this.setState({[field]: event.target.value});
    };

    render() {

        return (
            <Form horizontal>
                <FormGroup className=" no-margin">
                    <InputGroup>
                        <Row>
                            <Col xs={6}>
                                <FormControl
                                    placeholder="Username"
                                    style={{border: 0}}
                                    onChange={this.handleChange('username')}
                                    value={this.state.username}
                                />
                            </Col>
                            <Col xs={6}>
                                <FormControl
                                    placeholder="Team name"
                                    style={{border: 0}}
                                    onChange={this.handleChange('team')}
                                    value={this.state.team}
                                />
                            </Col>
                        </Row>
                        <InputGroup.Button>
                            <Button bsStyle="link" onClick={this.handleJoinTeam}>
                                Join&nbsp;&nbsp;<Icon name="chevron-right"/>
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
}
