import React from 'react';
import {Table} from 'react-bootstrap';
import RankingItem from './RankingItem';
import RankingListHeader from './RankingListHeader';

const RankingList = ({users, userId, sortBy, ranking}) => {
    return (
        <Table striped hover>
            <RankingListHeader sortBy={sortBy} ranking={ranking}/>
            <tbody>
            {
                users.map(user => (
                    <RankingItem key={user.id} user={user} highlight={user.id === userId}/>
                ))
            }
            </tbody>
        </Table>
    )
};

export default RankingList;
