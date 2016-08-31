import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Col } from 'react-bootstrap';

const mapStateToProps = state => ({...state});
@connect(mapStateToProps, null)
export default class ProfileLayout extends Component {
    render() {
        const { username } = this.props.params;
        const user = this.props.userList.find(user => user.username === username);

        return (
            <div>
                <h1>Profile <small>{ user.username }</small></h1>
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