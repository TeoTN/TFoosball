import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/infobar.actions';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const mapStateToProps = ({infoList}) => ({infoList});
const mapDispatchToProps = (dispatch) => ({
    handleMsg: (id) => dispatch(actions.handleMsg(id)),
});

const InfoBar = connect(mapStateToProps, mapDispatchToProps)(
({infoList, handleMsg}) => (
    <ListGroup className="container">
        {infoList.map(info => (
            <ListGroupItem
                header="Oh snap!"
                onClick={() => handleMsg(info.id)}
                key={info.id}>
                <span className="text-success">
                    { info.msg } <small>(Click to dismiss)</small>
                </span>
            </ListGroupItem>
        ))}
    </ListGroup>
));

export default InfoBar;