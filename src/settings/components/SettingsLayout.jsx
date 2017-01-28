import React from 'react';
import md5 from 'md5';
import { connect } from 'react-redux';

const mapStateToProps = ({auth}) => ({auth});

@connect(mapStateToProps, null)
class SettingsLayout extends React.Component {
    render() {
        const { profile } = this.props.auth;
        const avatarURL = `https://www.gravatar.com/avatar/${md5(profile.email)}`;
        return (
            <div>
                <picture>
                    <img src={avatarURL} type="image/jpeg" />
                </picture>
            </div>
        );
    }
}

export default SettingsLayout;
