import React from 'react';

const RankingItem = ({user, highlight}) => {
    return (
        <tr className={highlight ? 'selected' : ''}>
            {
                Object.entries(user).map(
                    ([key, label]) => <td key={key}>{JSON.stringify(user[key])}</td>
                )
            }
        </tr>
    )
};

export default RankingItem;
