import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Col } from 'react-bootstrap';
import { fetchProfile } from '../api/connectors';
import { receiveProfile } from '../actions/profile.actions';
import { withRouter } from 'react-router';
import { ensureSuccessOr, ensureJSON } from '../api/helpers';
import { raiseError } from '../actions/error.actions';


const mapStateToProps = ({users}) => ({users,});
const mapDispatchToProps = dispatch => ({
    receiveProfile: (response) => dispatch(receiveProfile(response)),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class ProfileLayout extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {receiveProfile, raiseError, params: {username}} = this.props;
        fetchProfile(username)
            .then(ensureSuccessOr('Failed to get user profile'))
            .then(ensureJSON)
            .then(receiveProfile)
            .catch(raiseError);
    }

    render() {
        const { children, profile, params: {username}} = this.props;
        return (
            <div>
                <h1>Profile <small>{ username }</small></h1>
                <Row>
                    <Col sm={5}>
                        <ProfileStats />
                    </Col>
                    <Col sm={7}>
                        <ProfileChart profile={profile} />
                    </Col>
                </Row>
                {children}
            </div>
        );
    }
}