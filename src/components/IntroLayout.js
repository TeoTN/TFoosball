import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import jumbo from '../assets/img/jumbotron.jpg';

export default (props) =>
    <Jumbotron style={{background: `url(${jumbo})`, color: 'white'}}>
        <h1>TFoosball</h1>
        <p>
            Welcome to the web application designed for tracking table foosball matches
            and measuring players progress.
        </p>
        <p>
            Please, sign up with Google to access the application.<br/><br/><br />
        </p>
        {props.children}
    </Jumbotron>
