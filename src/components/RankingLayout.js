import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {receiveUsers, sortBy} from '../actions/user.actions';
import {connect} from 'react-redux';
import {fetchUsers} from '../api/connectors';
import {raiseError} from '../actions/error.actions';
import {ensureJSON} from '../api/helpers';
import RankingList from './RankingList';

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = (dispatch, props) => ({
    receiveUsers: (data) => dispatch(receiveUsers(data)),
    sortBy: (column, order) => dispatch(sortBy(column, order))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RankingLayout extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetchUsers()
            .then(ensureJSON)
            .then(this.props.receiveUsers)
            .then(() => this.props.sortBy("id"))
            .catch(raiseError);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <h1>Ranking</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RankingList users={this.props.users} userId={this.props.auth.profile.id}
                                     sortBy={this.props.sortBy} ranking={this.props.ranking}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    };
}
