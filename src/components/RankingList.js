import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {fetchUsers} from '../api/connectors';
import {receiveUsers} from '../actions/user.actions';
import {raiseError} from '../actions/error.actions';
import RankingItem from './RankingItem';
import RankingListHeader from './RankingListHeader';

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = (dispatch, props) => ({
    receiveUsers: (data) => dispatch(receiveUsers(data)),
    raiseUnauthorized: () => dispatch(raiseError("Unauthorized - please log in.")),
    raiseUnexpected: () => dispatch(raiseError("Unexpected error while fetching user list"))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RankingList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetchUsers()
            .then(this.onFetchDone)
            .then(this.props.receiveUsers);
    }

    onFetchDone = (response) => {
        switch(response.status) {
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
        const list = this.sortUsers();

        return (
            <Table striped hover>
                <RankingListHeader/>
                <tbody>
                {
                    list.map(user => (
                        <RankingItem
                            key={user.id} user={user}
                            highlight={user.id === this.props.auth.profile.id}
                        />
                    ))
                }
                </tbody>
            </Table>
        );
    }

    sortUsers = () => this.props.users.sort((a, b) => {
        const {sorting} = this.props.ranking;
        return !(sorting.ascendingOrder ^ a[sorting.column] > b[sorting.column]); // Christmas gift for P.S.
    });
}