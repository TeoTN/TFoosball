import React from 'react';
import { connect } from 'react-redux';
import { Col, InputGroup, Form, FormGroup, FormControl, Button, ControlLabel, Row } from 'react-bootstrap';
import { requestJoinTeam } from '../teams.actions.js';
import Icon from 'react-fontawesome';
import GlyphButton from "../../shared/components/GlyphButton";


const mapDispatchToProps = (dispatch) => ({
    joinTeam: (team, username) => dispatch(requestJoinTeam(team, username)),
});

class JoinTeamForm extends React.PureComponent {
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
                <FormGroup>
                    <Col xsHidden sm={2} className="text-right">
                        <ControlLabel>Club name</ControlLabel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormControl
                            placeholder="Enter club name..."
                            onChange={this.handleChange('team')}
                            value={this.state.team}
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
                            onChange={this.handleChange('username')}
                            value={this.state.username}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <GlyphButton glyph="log-in" bsSize="small" bsStyle="primary"
                                     onClick={this.handleJoinTeam}>
                            Join the club
                        </GlyphButton>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default connect(null, mapDispatchToProps)(JoinTeamForm)
