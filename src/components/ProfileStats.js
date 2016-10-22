import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Well, Row, Col, ProgressBar } from 'react-bootstrap';
import Widget from './Widget';

const mapStateToProps = ({profile}) => ({
    profile,
});
@connect(mapStateToProps, null)
export default class ProfileStats extends Component {
    render() {
        const { profile } = this.props;
        const def = Math.round(profile.def * 100);
        const att = Math.round(profile.att * 100);
        const win = Math.round(profile.win * 100);
        const { win_streak, lost_streak, hi, lo } = profile;

        return (
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
                    <Col xs={6}>
                        <Widget label="Winning streak" value={win_streak} />
                    </Col>
                    <Col xs={6}>
                        <Widget label="Highest EXP" value={hi} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Widget label="Losing streak" value={lost_streak} />
                    </Col>
                    <Col xs={6}>
                        <Widget label="Lowest EXP" value={lo} />
                    </Col>
                </Row>
            </Well>
        );
    }
}
