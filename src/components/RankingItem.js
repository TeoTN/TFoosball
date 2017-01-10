import React from 'react';

const RankingItem = ({user, highlight, model}) => {
    return (
        <tr className={highlight ? 'selected' : ''}>
            {
                Object.entries(model).map(
                    ([key, label]) => <td key={key}>{user[key]}</td>
                )
            }
        </tr>
    )
};

export default RankingItem;
