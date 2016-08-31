import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Well, ProgressBar } from 'react-bootstrap';
import Widget from './Widget';

const mapStateToProps = state => ({...state});
@connect(mapStateToProps, null)
export default class ProfileStats extends Component {
    render() {
        const def = Math.round(this.props.profile.def * 100);
        const att = Math.round(this.props.profile.att * 100);
        const win = Math.round(this.props.profile.win * 100);
        const { win_streak, lost_streak, hi, lo } = this.props.profile;

        return (
            <Well>
                <h4>User statistics</h4>
                <span>
                    Win rate
                    <ProgressBar bsStyle="success" now={win} label={`${win}%`} />
                </span>
                <span>
                    Offence win rate
                    <ProgressBar bsStyle="danger" now={att} label={`${att}%`} />
                </span>
                <span>
                    Defence win rate
                    <ProgressBar bsStyle="info" now={def} label={`${def}%`} />
                </span>
                <Widget label="Winning streak" value={win_streak} />
                <Widget label="Highest EXP" value={hi} />
                <Widget label="Losing streak" value={lost_streak} />
                <Widget label="Lowest EXP" value={lo} />
            </Well>
        );
    }
}
