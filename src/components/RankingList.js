import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {fetchUsers} from '../api/connectors';
import {receiveUsers, sortBy} from '../actions/user.actions';
import {raiseError} from '../actions/error.actions';
import RankingItem from './RankingItem';
import RankingListHeader from './RankingListHeader';

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = (dispatch, props) => ({
    receiveUsers: (data) => dispatch(receiveUsers(data)),
    raiseUnauthorized: () => dispatch(raiseError("Unauthorized - please log in.")),
    raiseUnexpected: () => dispatch(raiseError("Unexpected error while fetching user list")),
    sortById: () => dispatch(sortBy("id")),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RankingList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetchUsers()
            .then(this.onFetchDone)
            .then(this.props.receiveUsers)
            .then(this.props.sortById);
    }

    onFetchDone = (response) => {
        switch (response.status) {
            case 200:
                return response.json();
            case 401:
                this.props.raiseUnauthorized();
                break;
            default:
                this.props.raiseUnexpected();
        }
    };

    render() {
        return (
            <Table striped hover>
                <RankingListHeader/>
                <tbody>
                {
                    this.props.users.map(user => (
                        <RankingItem key={user.id} user={user}
                                     highlight={user.id === this.props.auth.profile.id}
                        />
                    ))
                }
                </tbody>
            </Table>
        );
    }
}