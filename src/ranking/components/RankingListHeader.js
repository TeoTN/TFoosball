import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class RankingListHeader extends Component {
    getHeader = ([key, label]) => {
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
    };

    getDirection = (key) => {
        const {sorting} = this.props;
        return sorting.column !== key || !sorting.isAscendingOrder
    };

    render() {
        return (
            <thead>
            <tr>
                {
                    Object
                        .entries(this.props.model)
                        .map(this.getHeader)
                }
            </tr>
            </thead>
        )
    }
}
