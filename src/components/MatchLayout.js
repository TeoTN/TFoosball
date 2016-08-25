import React, { Component } from 'react';
import UserToolbar from './MatchToolbar';
import UserList from './UserList';
import FoosballTable from './FoosballTable';
import { Grid, Row } from 'react-bootstrap';

class MatchLayout extends Component {
    render() {
        return (
            <div>
                <h1>New match</h1>
                <Grid>
                    <Row>
                        <UserToolbar/>
                    </Row>
                    <Row>
                        <UserList/>
                        <FoosballTable />
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default MatchLayout;