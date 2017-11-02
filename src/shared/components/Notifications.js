import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../notifier.actions';
import { Alert } from 'react-bootstrap';

const mapStateToProps = ({notifications}) => ({notifications});
const mapDispatchToProps = (dispatch) => ({
    dismiss: (id) => dispatch(actions.handleMsg(id)),
});

@connect(mapStateToProps, mapDispatchToProps)
class Notifications extends React.Component {
    render() {
        const { notifications, dismiss } = this.props;
        return (
            <div className="container-fluid ui-card">
                {
                    notifications.map(({id, style, msg}) => (
                        <Alert key={id} bsStyle={ style } onClick={() => dismiss(id)} className="clickable no-margin">
                            <p>
                                { msg.toString() } <small>(Click to dismiss)</small>
                            </p>
                        </Alert>
                    ))
                }
            </div>
        );
    }
}

export default Notifications;
