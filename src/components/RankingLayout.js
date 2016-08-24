import React, { Component } from 'react';

export default class RankingLayout extends Component {
    render() {
        return (
            <div>
                <h1>Ranking</h1>
                {this.props.children}
            </div>
        );
    }
}