import React from 'react';
import { Well, Row, Col, ProgressBar } from 'react-bootstrap';
import Widget from './Widget';

const ProfileStats = ({
    profile: {
        def_ratio, att_ratio, win_ratio, curr_win_streak, win_streak, curr_lose_streak,
        lose_streak, highest_exp, lowest_exp
    }
}) => {
    const def = Math.round(def_ratio * 100);
    const att = Math.round(att_ratio * 100);
    const win = Math.round(win_ratio * 100);
    return (
        <Col sm={5}>
        <Well>
            <h4>User statistics</h4>
            <span>
                <h5>Win rate</h5>
                <ProgressBar bsStyle="success" now={win} label={`${win}%`} />
            </span>
            <span>
                <h5>Offence win rate</h5>
                <ProgressBar bsStyle="danger" now={att} label={`${att}%`} />
            </span>
            <span>
                <h5>Defence win rate</h5>
                <ProgressBar bsStyle="info" now={def} label={`${def}%`} />
            </span>
            <Row>
                <Widget label="Longest winning streak" value={win_streak} />
                <Widget label="Longest losing streak" value={lose_streak} />
            </Row>
            <Row>
                <Widget label="Winning streak" value={curr_win_streak} />
                <Widget label="Losing streak" value={curr_lose_streak} />
            </Row>
            <Row>
                <Widget label="Highest EXP" value={highest_exp} />
                <Widget label="Lowest EXP" value={lowest_exp} />
            </Row>
        </Well>
        </Col>
    );
};

export default ProfileStats;
