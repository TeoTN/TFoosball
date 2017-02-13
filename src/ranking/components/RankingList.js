import React from 'react';
import {Table} from 'react-bootstrap';
import RankingItem from './RankingItem';
import RankingListHeader from './RankingListHeader';
import {IS_MOBILE} from '../../api/config';
import { browserHistory } from 'react-router';

const RankingList = ({users, username, sortBy, ranking}) => {
    const model = (IS_MOBILE) ? ranking.model.mobile : ranking.model.desktop;
    const showProfile = (username) => () => { browserHistory.push(`/profile/${username}/stats`) };

    return (
        <Table striped hover>
            <RankingListHeader sortBy={sortBy} ranking={ranking} model={model}/>
            <tbody>
            {
                users.map(user =>
                    <RankingItem
                        key={user.id}
                        user={user}
                        model={model}
                        highlight={user.username === username}
                        onClick={showProfile(user.username)}
                    />
                )
            }
            </tbody>
        </Table>
    )
};

export default RankingList;
