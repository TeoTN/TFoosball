import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Col } from 'react-bootstrap';
import { fetchUsers } from '../api/connectors';
import { receiveUsers } from '../actions/user.actions';

const mapStateToProps = ({profile}) => ({
    profile,
});

const mapDispatchToProps = (dispatch, props) => ({
    receiveUsers: (response) => dispatch(receiveUsers(response)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ProfileLayout extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetchUsers()
            .then(this.props.receiveUsers);
    }

    render() {
        const { username } = this.props.params;

        // TODO Fetch user from API
        return (
            <div>
                <h1>Profile <small>{ username }</small></h1>
                <Row>
                    <Col sm={5}>
                        <ProfileStats />
                    </Col>
                    <Col sm={7}>
                        <ProfileChart />
                    </Col>
                </Row>
                {this.props.children}
            </div>
        );
    }
}