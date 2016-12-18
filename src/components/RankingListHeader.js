import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Glyphicon} from 'react-bootstrap';
import * as RankingActions from '../actions/ranking.actions';

const mapStateToProps = (state) => ({
    sorting: state.ranking.sorting,
    ...state
});

const mapDispatchToProps = (dispatch) => ({
    sort: (column, order) => dispatch(RankingActions.sort(column, order)),
});


@connect(mapStateToProps, mapDispatchToProps)
export default class RankingListHeader extends Component {
    getDirection(key) {
        const {sorting} = this.props;
        return sorting.column !== key
            ? true
            : !sorting.ascendingOrder
    }

    getHeader([key, label]) {
        const {sort, sorting} = this.props;
        return (
            <th key={key} onClick={() => sort(key, this.getDirection(key))} style={{cursor: 'pointer'}}>
                {label}&nbsp;
                {
                    sorting.column === key
                        ? <Glyphicon glyph={`sort-by-attributes${sorting.ascendingOrder ? '' : '-alt'}`}/>
                        : null
                }
            </th>
        )
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