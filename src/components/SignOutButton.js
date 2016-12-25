import React from 'react';
import { Button } from 'react-bootstrap';

const SignOutButton = ({signOut}) => (
    <Button onClick={signOut}
            bsStyle="danger"
            style={{marginTop: '12px'}}
            bsSize="small">
        Sign out
    </Button>
);

export default SignOutButton;
