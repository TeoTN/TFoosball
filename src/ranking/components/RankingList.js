import React from 'react';
import { Table } from 'react-bootstrap';
import RankingItem from './RankingItem';
import RankingListHeader from './RankingListHeader';
import { IS_MOBILE } from '../../api/config';
import { browserHistory } from 'react-router';

const model = {
    "desktop": {
        "username": "Username",
        "first_name": "First name",
        "last_name": "Last name",
        "exp": "EXP",
        "att_ratio": "Attack ratio",
        "def_ratio": "Defense ratio",
        "lose_streak": "Lose streak",
        "win_streak": "Win streak",
        "lowest_exp": "Lowest EXP",
        "highest_exp": "Highest EXP"
    },
    "mobile": {
        "username": "Username",
        "exp": "Experience"
    }
};

const RankingList = ({users, username, sortBy, sorting}) => {
    const currentModel = (IS_MOBILE) ? model.mobile : model.desktop;
    const showProfile = (username) => () => {
        browserHistory.push(`/profile/${username}/stats`)
    };

    return (
        <Table striped hover>
            {/*TODO Refactor this to use ListGroupItem*/}
            <RankingListHeader sortBy={sortBy} sorting={sorting} model={currentModel}/>
            <tbody>
            {
                users.map(user =>
                    <RankingItem
                        key={user.id}
                        user={user}
                        model={currentModel}
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
