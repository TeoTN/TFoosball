import React from 'react'
import {Row, Col, Panel, Grid} from 'react-bootstrap';
import Icon from 'react-fontawesome';

const PromoBar = () => {
    return (
        <Grid>
            <Row>
                <Col xs={4}>
                    <Panel className="promo">
                        <h2 className="promo-h1 promo-success"><Icon name="users"/> Enroll your team</h2>
                        <p>
                            Join your group of colleagues playing one of the most entertaining games ever created. Don't
                            hesitate, it's totally worth it!
                        </p>
                    </Panel>
                </Col>
                <Col xs={4}>
                    <Panel className="promo">
                        <h2 className="promo-h1 promo-warning"><Icon name="trophy"/> Challange Accepted</h2>
                        <p>
                            Feel the thrill while competing with the most skilled players. Turn your weaknesses to your
                            strengths and reach the top!
                        </p>
                    </Panel>
                </Col>
                <Col xs={4}>
                    <Panel className="promo">
                        <h2 className="promo-h1 promo-primary"><Icon name="area-chart"/> Watch statistics</h2>
                        <p>
                            Break your personal records and achievements, learn from your previous games to become the
                            number one!
                        </p>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    );
};

export default PromoBar;
