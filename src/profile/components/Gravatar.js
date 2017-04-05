import React from 'react'
import md5 from 'md5';

const Gravatar = ({email}) => {
    if (!email) return null;
    const avatarURL = `https://www.gravatar.com/avatar/${md5(email)}`;
    return (
        <picture className="profile-photo">
            <img src={avatarURL} type="image/jpeg" alt="avatar" />
        </picture>
    );
};

export default Gravatar;
