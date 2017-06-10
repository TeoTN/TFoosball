import React from 'react'
import md5 from 'md5';

const Gravatar = ({email}) => {
    if (!email) return null;
    const avatarURL = `https://www.gravatar.com/avatar/${md5(email)}?s=200`;
    return (
        <picture className="profile-photo" title="Wordpress Gravatar">
            <img src={avatarURL} type="image/jpeg" alt="gravatar" />
        </picture>
    );
};

export default Gravatar;
