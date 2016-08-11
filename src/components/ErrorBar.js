import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ErrorActions from '../actions/error.actions';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch, props) => {
    return {
        raiseError: (msg) => dispatch(ErrorActions.raiseError(msg)),
        handleError: (id) => dispatch(ErrorActions.handleError(id)),
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ErrorBar extends Component {
    render() {
        return (
        <div>
            <ul>
                {
                    this.props.errorList.map(
                        error => (
                            <li key={error.id} className="text-danger"
                                     onClick={() => this.props.handleError(error.id)}>
                            { error.msg }
                            </li>
                        )
                    )
                }
            </ul>
        </div>
        );
    }
}