import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
// import * as UserActions from '../actions/user.actions';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch, props) => {
    return {
        handleChange: (eventKey, event) => {
            // dispatch(UserActions.userToggle(prev));
            // dispatch(UserActions.userToggle(next));
        }
    }
};
@connect(mapStateToProps, mapDispatchToProps)
class UserPicker extends Component {
    getUsersOptions = () => {
        return this.props.users.map(
            (user, index) => (
                <MenuItem eventKey={user.id} active={user.playing} key={index}>
                    {user.username}
                </MenuItem>
            )
        );
    };

    getTitle = () => (this.props.player)?this.props.player.username:'-----';

    getColor = () => this.props.team === 'blue' ? 'info' : 'danger';

    render() {
        const {team, position} = this.props;
        return (
            <DropdownButton bsStyle={this.getColor()} title={this.getTitle()}
                            id={`player-${team}-${position}`} onSelect={this.props.handleChange}>
                {this.getUsersOptions()}
            </DropdownButton>
        );
    }
}

export default UserPicker;
