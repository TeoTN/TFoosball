import React from 'react';
import {Table} from 'react-bootstrap';
import RankingItem from './RankingItem';
import RankingListHeader from './RankingListHeader';
import {IS_MOBILE} from '../api/config';

const RankingList = ({users, authId, sortBy, ranking}) => {
    const model = (IS_MOBILE) ? ranking.model.mobile : ranking.model.desktop;

    return (
        <Table striped hover>
            <RankingListHeader sortBy={sortBy} ranking={ranking} model={model}/>
            <tbody>
            {
                users.map(user =>
                    <RankingItem key={user.id} user={user} model={model} highlight={user.id === authId}/>
                )
            }
            </tbody>
        </Table>
    )
};

export default RankingList;
