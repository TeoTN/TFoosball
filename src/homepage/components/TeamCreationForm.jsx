import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { createTeam } from '../../shared/teams.actions.js';

const mapStateToProps = ({auth}) => ({auth});
const mapDispatchToProps = (dispatch) => ({
    createTeam: (team) => dispatch(createTeam(team)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class TeamCreationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: '',
        };
    }

    handleCreateTeam = () => {
        const { createTeam } = this.props;
        const { team } = this.state;
        createTeam(team);
    };

    handleChange = (event) => {
        this.setState({ team: event.target.value });
    };

    render() {
        return (
            <Form>
                <FormGroup>
                    <Row>
                        <Col xs={3}>
                            <FormControl
                                placeholder="Team name"
                                onChange={this.handleChange}
                                value={this.state.team}
                            />
                        </Col>
                        <Button bsStyle="success" onClick={this.handleCreateTeam}>Create a new team</Button>
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
