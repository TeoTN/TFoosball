import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';

export default class RankingListHeader extends Component {
    getHeader = ([key, label]) => {
        const {sortBy, ranking} = this.props;
        return (
            <th key={key} onClick={() => sortBy(key, this.getDirection(key))} style={{cursor: 'pointer'}}>
                {label}&nbsp;
                {
                    ranking.sorting.column === key
                        ? <Glyphicon glyph={`sort-by-attributes${ranking.sorting.isAscendingOrder ? '' : '-alt'}`}/>
                        : null
                }
            </th>
        )
    };

    getDirection = (key) => {
        const {sorting} = this.props.ranking;
        return sorting.column !== key || !sorting.isAscendingOrder
    };

    render() {
        return (
            <thead>
            <tr>
                {
                    Object
                        .entries(this.props.ranking.model)
                        .map(this.getHeader)
                }
            </tr>
            </thead>
        )
    }
}
