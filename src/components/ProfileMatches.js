import React from 'react';
import { Panel, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = ({ profile: { matches } }) => ({ matches, });

const c = (val, col, s = 1) => {
    const cls = col === 'blue' ? 'info' : col === 'red' ? 'danger' : 'primary';
    return (
        <Col xs={s}>
            <span className={`text-${cls}`}>{val}</span>
        </Col>
    );
};

const Match = ({red_att, red_def, blue_att, blue_def, red_score, blue_score, points}) => (
    <Row>
        {c(red_score, 'red')} {c(red_def, 'red')} {c(red_att, 'red')}
        {c(blue_att, 'blue')} {c(blue_def, 'blue')} {c(blue_score, 'blue')}
        {c(Math.abs(points))}
    </Row>
);

const ProfileMatches = ({ params: { username }, matches = [] }) => (
    <Panel>
        <h4>Matches - { username }</h4>
        <Row>
            {c('Score', 'red')} {c('Defense', 'red')} {c('Attack', 'red')}
            {c('Attack', 'blue')} {c('Defense', 'blue')} {c('Score', 'blue')}
            {c('Points')}
        </Row>
        { matches.map((match, idx) => <Match key={idx} {...match} />) }
    </Panel>
);
export default connect(mapStateToProps, null)(ProfileMatches);
