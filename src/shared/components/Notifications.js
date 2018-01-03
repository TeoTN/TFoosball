import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../notifier.actions';
import { Alert } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';

const mapStateToProps = ({notifications}) => ({notifications});
const mapDispatchToProps = (dispatch) => ({
    dismiss: (id) => dispatch(actions.handleMsg(id)),
});

class Notifications extends React.Component {
    shouldComponentUpdate({notifications: newNotifications}) {
        const {notifications} = this.props;
        const getId = n => n.id;
        const shouldUpdate = !isEqual(notifications.map(getId), newNotifications.map(getId));
        if (shouldUpdate) {
            window.scroll({top: 0, left: 0, behavior: 'smooth' });
        }
        return shouldUpdate;
    }

    render() {
        const {notifications, dismiss} = this.props;
        return (
            <div className="container-fluid ui-card">
                {
                    notifications.map(({id, style, msg}) => (
                        <Alert key={id} bsStyle={style} onClick={() => dismiss(id)} className="clickable no-margin">
                            <p>
                                {msg.toString()}
                                <small>&nbsp;(Click to dismiss)</small>
                            </p>
                        </Alert>
                    ))
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
