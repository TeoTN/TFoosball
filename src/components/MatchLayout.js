import React, { Component } from 'react';
import UserList from './UserList';
import FoosballTable from './FoosballTable';
import { Grid, Row, Col } from 'react-bootstrap';

class MatchLayout extends Component {
    render() {
        return (
        <Grid>
            <Row>
                {/* Order of elements is reversed so that on mobile it fits nicely */}
                <Col xs={12} sm={7} smPush={5} lg={6} lgPush={4}>
                    <span id="foosball-table" />
                    <FoosballTable />
                </Col>
                <Col xs={12} sm={5} smPull={7} lg={4} lgPull={6}>
                    <UserList/>
                </Col>
            </Row>
        </Grid>
        );
    }
}

export default MatchLayout;