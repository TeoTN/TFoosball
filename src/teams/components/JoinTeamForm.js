import React from 'react';
import {connect} from 'react-redux';
import {Col, InputGroup, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
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
            <Form className="row" horizontal>
                <FormGroup className="col-xs-12 row" style={{marginBottom: 0}}>
                    <InputGroup style={{width: '100%'}}>
                        <Col xs={12} sm={5}>
                            <FormControl
                                placeholder="Enter team name..."
                                style={{border: 0}}
                                onChange={this.handleChange('team')}
                                value={this.state.team}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <FormControl
                                placeholder="Enter new username..."
                                style={{border: 0}}
                                onChange={this.handleChange('username')}
                                value={this.state.username}
                            />
                        </Col>
                        <Button bsStyle="link" onClick={this.handleJoinTeam} className="pull-right"
                                style={{marginRight: '-15px'}}>
                            Join&nbsp;&nbsp;<Icon name="chevron-right"/>
                        </Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
}
