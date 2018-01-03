import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { sortBy } from '../../users/users.actions';
import { connect } from 'react-redux';
import RankingList from './RankingList';
import WinnersStand from './WinnersStand';
import { getSorting, getTop3, getUsersSorted } from '../../users/users.reducer';


const mapStateToProps = (state) => {
    const {auth} = state;
    return {
        users: getUsersSorted(state),
        sorting: getSorting(state),
        auth,
        winners: getTop3(state),
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    sortBy: (column, order) => dispatch(sortBy(column, order)),
});

class RankingLayout extends React.PureComponent {
    render() {
        const {users, sortBy, auth, winners, sorting} = this.props;
        const profile = auth.profile || {};

        return (
            <Grid>
                <WinnersStand winners={winners}/>
                <Row>
                    <Col xs={12}>
                        <RankingList
                            users={users}
                            username={profile.username}
                            sortBy={sortBy}
                            sorting={sorting}
                        />
                    </Col>
                </Row>
                <div className="filler"/>
            </Grid>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingLayout)
