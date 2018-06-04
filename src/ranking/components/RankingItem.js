import React from 'react';
import Icon from 'react-fontawesome';

const RankingItem = ({user, highlight, onClick, model}) => {
    return (
        <tr
            className={`clickable ${highlight ? 'selected' : ''}`}
            onClick={onClick}>
            {
                Object.entries(model).map(
                    ([key, label]) => (
                        <td key={key} className='text-ellipsis'>
                            {user[key]}&nbsp;
                            {
                                key === 'username' &&
                                user.is_team_admin &&
                                <Icon name='superpowers' ariaLabel={'Team admin'} className='text-danger'/>
                            }
                        </td>
                    )
                )
            }
        </tr>
    )
};

export default RankingItem;
