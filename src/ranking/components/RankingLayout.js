import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {sortBy} from '../../users/user.actions';
import {connect} from 'react-redux';
import RankingList from './RankingList';

const mapStateToProps = ({users, ranking, auth}) => ({
    users, ranking, auth,
});

const mapDispatchToProps = (dispatch, props) => ({
    sortBy: (column, order) => dispatch(sortBy(column, order)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RankingLayout extends React.Component {
    render() {
        const {users, sortBy, ranking, auth} = this.props;
        const profile = auth.profile || {};

        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Ranking</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <RankingList users={users} username={profile.username} sortBy={sortBy} ranking={ranking}/>
                    </Col>
                </Row>
            </Grid>
        );
    };
}
