import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {sortBy} from '../../users/user.actions';
import {connect} from 'react-redux';
import RankingList from './RankingList';
import WinnersStand from './WinnersStand';
import {getSortedUsers} from '../../users/users.reducer';


const mapStateToProps = ({users, ranking, auth}) => ({
    users, ranking, auth,
    winners: getSortedUsers(users, 'exp', false).slice(0, 3),
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
                <WinnersStand winners={winners} />
                <Row>
                    <Col xs={12}>
                        <RankingList users={users} username={profile.username} sortBy={sortBy} ranking={ranking}/>
                    </Col>
                </Row>
                <div className="filler" />
            </Grid>
        );
    };
}
