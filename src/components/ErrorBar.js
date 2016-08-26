import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ErrorActions from '../actions/error.actions';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

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
            <ListGroup className="container">
                {this.props.errorList.map(error => (
                    <ListGroupItem header="Oh snap!"
                                   onClick={() => this.props.handleError(error.id)} key={error.id}>
                        <span className="text-danger">
                            { error.msg } <small>(Click to dismiss)</small>
                        </span>
                    </ListGroupItem>
                    ))}
            </ListGroup>
        );
    }
}