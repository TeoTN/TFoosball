import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import MatchList from './MatchList';
import NaivePager from '../../shared/components/NaivePager';

const mapStateToProps = ({matches}) => ({
    matches,
});

@connect(mapStateToProps, null)
export default class MatchesLayout extends React.Component {
    render() {
        const { matches } = this.props;

        return (
            <Grid>
                <Row>
                    <Col>
                        <h1>Matches</h1>
                    </Col>
                    <NaivePager page={matches.page} prefix={`/matches`} totalPages={matches.totalPages} />
                </Row>
                <Row>
                    <Col>
                        <MatchList matches={matches.list} />
                    </Col>
                </Row>
                <Row>
                    <NaivePager page={matches.page} prefix={`/matches`} totalPages={matches.totalPages} />
                </Row>
            </Grid>
        );
    };
}
