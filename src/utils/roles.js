export default function getRoles(chosen) {
    let players = chosen.slice(0);
    const isAtt = {
        red: Math.random() < 0.5 + players[0].att - players[1].att,
        blue: Math.random() < 0.5 + players[2].att - players[3].att,
    };
    const getUpdatedUser = (user, team, isSecond) => ({
        ...user, team,
        playing: true,
        position: isAtt[team] ^ isSecond ? 'att' : 'def',
    });
    return {
        [players[0].username]: getUpdatedUser(players[0], 'red', false),
        [players[1].username]: getUpdatedUser(players[1], 'red', true),
        [players[2].username]: getUpdatedUser(players[2], 'blue', false),
        [players[3].username]: getUpdatedUser(players[3], 'blue', true),
    };
}
