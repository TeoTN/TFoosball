export default function getRoles(chosen) {
    let players = chosen.slice(0);
    const isRedAtt = Math.random() < 0.5 + players[0].att - players[1].att;
    const isBlueAtt = Math.random() < 0.5 + players[2].att - players[3].att;
    players[0].team = players[1].team = 'red';
    players[2].team = players[3].team = 'blue';
    players[0].role = isRedAtt ? 'att' : 'def';
    players[1].role = isRedAtt ? 'def' : 'att';
    players[2].role = isBlueAtt ? 'att' : 'def';
    players[3].role = isBlueAtt ? 'def' : 'att';
    return {
        [players[0].username]: players[0],
        [players[1].username]: players[1],
        [players[2].username]: players[2],
        [players[3].username]: players[3],
    };
}
