import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {receiveUsers, sortBy} from '../actions/user.actions';
import {connect} from 'react-redux';
import {fetchUsers} from '../api/connectors';
import {raiseError} from '../actions/error.actions';
import RankingList from './RankingList';

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = (dispatch, props) => ({
    receiveUsers: (data) => dispatch(receiveUsers(data)),
    sortBy: (column, order) => dispatch(sortBy(column, order)),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RankingLayout extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {raiseError} = this.props;

        fetchUsers()
            .then(this.props.receiveUsers)
            .then(() => this.props.sortBy("id"))
            .catch(raiseError);
    }

    render() {
        const {users, sortBy, ranking, auth} = this.props;
        const profile = auth.profile || {};

        return (
            <Grid>
                <Row>
                    <Col>
                        <h1>Ranking</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RankingList users={users} authId={profile.id} sortBy={sortBy} ranking={ranking}/>
                    </Col>
                </Row>
            </Grid>
        );
    };
}
