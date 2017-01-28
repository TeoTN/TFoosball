import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { rejectModal, acceptModal } from '../modal.actions';

const mapStateToProps = ({modal}) => ({
    ...modal,
});
const mapDispatchToProps = (dispatch) => ({
    reject: () => dispatch(rejectModal()),
    accept: () => dispatch(acceptModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
class QuestionModal extends React.Component {
    onAccept = () => {
        const { accept, onAccept } = this.props;
        accept();   // Callee callback
        if (onAccept) onAccept(); // Caller callback
    };

    onReject = () => {
        const { reject, onReject } = this.props;
        reject();   // Callee callback
        if (onReject) onReject(); // Caller callback
    };

    render() {
        const { title, heading, text } = this.props;
        if (typeof title === 'undefined') return null;

        return (
            <Modal show={!!title} onHide={this.onReject}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <strong>{heading}</strong>
                    <p>{text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onReject} bsStyle={'link'} className="text-danger">No</Button>
                    <Button onClick={this.onAccept} bsStyle={'success'}>Yes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default QuestionModal;