import React from 'react';
import {Button} from 'react-bootstrap';
import checkMobile from '../../utils/checkMobile';

const SignInButton = ({signIn, ...props}) => (
    <Button
        onClick={signIn}
        bsStyle="danger"
        style={{marginTop: '12px'}}
        bsSize="small"
        block={checkMobile()}
        {...props}>
        Let me in with Google
    </Button>
);

export default SignInButton;
