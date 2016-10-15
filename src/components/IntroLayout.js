import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export default (props) =>
    <Jumbotron>
        <h1>TFoosball</h1>
        <p>
            Welcome to the web application designed for tracking table foosball matches
            and measuring players progress.
        </p>
        <p>
            Please, sign up with Google to access the application.
        </p>
        {props.children}
    </Jumbotron>
