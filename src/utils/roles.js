import shuffle from 'lodash/shuffle';

export default function getRoles(selectedUsers) {
    const players = shuffle(Object.values(selectedUsers));
    if (players.length < 4) {
        throw new Error('At least 4 players should be selected.');
    }
    const r1 = Math.random();
    const r2 = Math.random();
    const d1 = players[0].att_ratio - players[1].att_ratio;
    const d2 = players[2].att_ratio - players[3].att_ratio;
    const isAtt = {
        red: r1 < 0.5 + d1,
        blue: r2 < 0.5 + d2,
    };
    return {
        [isAtt['red'] ? 'red_att' : 'red_def']: players[0].id,
        [!isAtt['red'] ? 'red_att' : 'red_def']: players[1].id,
        [isAtt['blue'] ? 'blue_att' : 'blue_def']: players[2].id,
        [!isAtt['blue'] ? 'blue_att' : 'blue_def']: players[3].id,
    };
}
