import React, { Component } from 'react';
import {
    Jumbotron,
    Form,
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/profile.actions';
import { raiseError } from '../actions/error.actions';
import { updateProfile } from '../api/connectors';
import { ensureJSON, ensureSuccessOr } from '../api/helpers';
import { browserHistory } from 'react-router'


const mapDispatchToProps = (dispatch) => ({
    update: (userNewData) => dispatch(actions.profileUpdate(userNewData)),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@connect(null, mapDispatchToProps)
export default class InitComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: ''
        };
    }

    handleChange = (e) => {
        this.setState({ newUsername: e.target.value });
    };

    register = (e) => {
        e.preventDefault();
        const { update, raiseError } = this.props;

        const data = {
            username: this.state.newUsername,
        };

        updateProfile(data)
            .then(ensureSuccessOr('Failed to update the profile.'))
            .then(ensureJSON)
            .then(update)
            .catch(raiseError)
            .then(r => browserHistory.push('/'));
    };

    render() {
        return (
            <Jumbotron>
                <h1>Welcome <small>TFoosball</small></h1>
                <p>
                    We're glad to see you've joined us for the first time.<br />
                    Hence, we'd like you to set up your username:
                </p>
                <Form onSubmit={this.register} inline>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.state.newUsername}
                            placeholder="Your new username"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" bsStyle="success">
                        Save
                    </Button>
                </Form>
                {this.props.children}
            </Jumbotron>
        );
    }
}
