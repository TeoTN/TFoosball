import React from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {sortBy} from '../../users/user.actions';
import {connect} from 'react-redux';
import RankingList from './RankingList';
import WinnersStand from './WinnersStand';

const mapStateToProps = ({users, ranking, auth}) => ({
    users, ranking, auth,
    winners: users.sort((u1, u2) => u1.exp < u2.exp ? 1 : u1.exp === u2.exp ? 0 : -1).slice(0, 3),
});

const mapDispatchToProps = (dispatch, props) => ({
    sortBy: (column, order) => dispatch(sortBy(column, order)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RankingLayout extends React.Component {
    render() {
        const {users, sortBy, ranking, auth, winners} = this.props;
        const profile = auth.profile || {};

        return (
            <Grid>
                <Panel>
                <WinnersStand winners={winners} />
                </Panel>
                <Row>
                    <Col xs={12}>
                        <RankingList users={users} username={profile.username} sortBy={sortBy} ranking={ranking}/>
                    </Col>
                </Row>
            </Grid>
        );
    };
}
