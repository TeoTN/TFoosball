import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import RankingList from './RankingList';

const RankingLayout = () => (
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

export default RankingLayout;