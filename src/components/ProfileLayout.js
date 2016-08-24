import React, { Component } from 'react';

export default class ProfileLayout extends Component {
    render() {
        return (
            <div>
                <h1>Profile #{this.props.params.userid}</h1>
                {this.props.children}
            </div>
        );
    }
}