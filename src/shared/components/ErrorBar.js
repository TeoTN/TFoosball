import React from 'react';
import { connect } from 'react-redux';
import * as ErrorActions from '../error.actions';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const mapStateToProps = ({errorList}) => ({errorList});
const mapDispatchToProps = (dispatch) => ({
    handleError: (id) => dispatch(ErrorActions.handleError(id)),
});

const ErrorBar = connect(mapStateToProps, mapDispatchToProps)(
    ({errorList, handleError}) => (
        errorList.length > 0 ?
            <ListGroup className="container">
                {errorList.map(error => (
                    <ListGroupItem
                        header="Oh snap!"
                        onClick={() => handleError(error.id)}
                        key={error.id}>
                            <span className="text-danger">
                                { error.msg } <small>(Click to dismiss)</small>
                            </span>
                    </ListGroupItem>
                ))}
            </ListGroup> :
            null
    )
);
export default ErrorBar;