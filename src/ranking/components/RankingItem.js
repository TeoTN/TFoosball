import React from 'react';

const RankingItem = ({user, highlight, onClick, model}) => {
    return (
        <tr
            className={`clickable ${highlight ? 'selected' : ''}`}
            onClick={onClick}>
            {
                Object.entries(model).map(
                    ([key, label]) => <td key={key}>{user[key]}</td>
                )
            }
        </tr>
    )
};

export default RankingItem;
