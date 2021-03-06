import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { rejectModal, acceptModal } from '../modal.actions';
import ReactMarkdown from 'react-markdown';

const mapStateToProps = ({modal}) => ({
    ...modal,
});
const mapDispatchToProps = (dispatch) => ({
    reject: () => dispatch(rejectModal()),
    accept: () => dispatch(acceptModal()),
});

class ModalMessage extends React.PureComponent {
    onAccept = () => {
        const {accept, onAccept} = this.props;
        accept();   // Callee callback
        if (onAccept) onAccept(); // Caller callback
    };

    onReject = () => {
        const {reject, onReject} = this.props;
        reject();   // Callee callback
        if (onReject) onReject(); // Caller callback
    };

    render() {
        const {title, heading, text, isMarkdown} = this.props;
        if (typeof title === 'undefined') return null;

        return (
            <Modal show={!!title} onHide={this.onReject}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                {isMarkdown ?
                    <Modal.Body>
                        <ReactMarkdown source={text}/>
                    </Modal.Body> :
                    <Modal.Body>
                        <strong>{heading}</strong>
                        <p style={{whiteSpace: 'pre-line'}}>{text}</p>
                    </Modal.Body>
                }
                <Modal.Footer>
                    {this.props.onReject ?
                        <Button onClick={this.onReject} bsStyle={'link'} className="text-danger">
                            Cancel
                        </Button> :
                        null
                    }
                    {this.props.onAccept ?
                        <Button onClick={this.onAccept} bsStyle={'success'}>OK</Button> :
                        null
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage);
