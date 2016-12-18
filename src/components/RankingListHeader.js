import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Glyphicon} from 'react-bootstrap';
import * as RankingActions from '../actions/ranking.actions';
import * as UserActions from '../actions/user.actions';

const mapStateToProps = (state) => ({
    sorting: state.ranking.sorting,
    ...state
});

const mapDispatchToProps = (dispatch) => ({
    sortBy: (column, order) => {
        dispatch(UserActions.sortBy(column, order));
        dispatch(RankingActions.sortBy(column, order));
    },
});


@connect(mapStateToProps, mapDispatchToProps)
export default class RankingListHeader extends Component {
    getHeader([key, label]) {
        const {sortBy, sorting} = this.props;
        return (
            <th key={key} onClick={() => sortBy(key, this.getDirection(key))} style={{cursor: 'pointer'}}>
                {label}&nbsp;
                {
                    sorting.column === key
                        ? <Glyphicon glyph={`sort-by-attributes${sorting.isAscendingOrder ? '' : '-alt'}`}/>
                        : null
                }
            </th>
        )
    }

    getDirection(key) {
        const {sorting} = this.props;
        return sorting.column !== key
            ? true
            : !sorting.isAscendingOrder
    }

    render() {
        return (
            <thead>
            <tr>
                {
                    Object
                        .entries(this.props.ranking.model)
                        .map(this.getHeader.bind(this))
                }
            </tr>
            </thead>
        )
    }
}