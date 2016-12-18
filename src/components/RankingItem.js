import React from 'react';

const RankingItem = ({user, highlight, isMobile}) => {
    const filteredUser = (isMobile && user)
        ? (({id, username, exp}) => ({id, username, exp}))(user)
        : user;

    return (
        <tr className={highlight ? 'selected' : ''}>
            {
                Object.entries(filteredUser).map(
                    ([key, label]) => <td key={key}>{filteredUser[key]}</td>
                )
            }
        </tr>
    )
};

export default RankingItem;