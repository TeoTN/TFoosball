import React from 'react';
import { Well, Row, Col } from 'react-bootstrap';
import Widget from '../../shared/components/Widget';
import Doughnut from '../../shared/components/Doughnut';

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
        <Well>
            <Row>
                <Col sm={4} xs={4} smOffset={1}>
                    <Doughnut value={win} bsStyle="success" label="Win rate" />
                </Col>
                <Col sm={3} xs={4}>
                    <Doughnut value={att} bsStyle="danger" label="Offence wins"/>
                </Col>
                <Col sm={3} xs={4}>
                    <Doughnut value={def} bsStyle="info" label="Defence wins"/>
                </Col>
            </Row>
            <Row>
                <Widget label="Winning streak" value={curr_win_streak} altValue={win_streak} style="success" />
                <Widget label="Losing streak" value={curr_lose_streak} altValue={lose_streak} style="danger" />
            </Row>
            <Row>
                <Widget label="Highest EXP" value={highest_exp} style="primary" />
                <Widget label="Lowest EXP" value={lowest_exp} style="primary" />
            </Row>
        </Well>
    );
};

export default ProfileStats;
