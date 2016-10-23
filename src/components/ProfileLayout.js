import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Col } from 'react-bootstrap';
import { fetchUsers } from '../api/connectors';
import { receiveUsers } from '../actions/user.actions';
import { withRouter } from 'react-router';
import { ensureSuccessOr, ensureJSON } from '../api/helpers';
import { raiseError } from '../actions/error.actions';


const getUserProfile = (state, username) => state.find(user => user.username === username);

const mapStateToProps = (state, {params}) => ({
    profile: getUserProfile(state.users, params.username || ''),
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    receiveUsers: (data) => dispatch(receiveUsers(data)),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class ProfileLayout extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {receiveUsers, raiseError} = this.props;
        fetchUsers()
            .then(ensureSuccessOr('Failed to get user'))
            .then(ensureJSON)
            .then(receiveUsers)
            .catch(raiseError);
    }

    render() {
        const { username } = this.props.params;
        console.log(this.props.users);
        return (
            <div>
                <h1>Profile <small>{ username }</small></h1>
                <Row>
                    <Col sm={5}>
                        <ProfileStats />
                    </Col>
                    <Col sm={7}>
                        <ProfileChart profile={this.props.profile} />
                    </Col>
                </Row>
                {this.props.children}
            </div>
        );
    }
}