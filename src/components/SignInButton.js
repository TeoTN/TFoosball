import React from 'react';
import { Button } from 'react-bootstrap';

const SignInButton = ({signIn}) => (
    <Button onClick={signIn}
            bsStyle="danger"
            style={{marginTop: '12px'}}
            bsSize="small">
        Let me in with Google
    </Button>
);

export default SignInButton;
