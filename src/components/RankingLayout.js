import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import RankingList from './RankingList';

export default class RankingLayout extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <h1>Ranking</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RankingList />
                    </Col>
                </Row>
            </Grid>
        );
    }
}