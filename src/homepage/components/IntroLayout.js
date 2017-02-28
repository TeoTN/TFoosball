import React from 'react';
import { Jumbotron, Grid } from 'react-bootstrap';
import TeamCreationForm from './TeamCreationForm';

export default (props) =>
    <Jumbotron>
        <Grid>
        <h1>Make it funny, again!</h1>
        <p>
            Do you and your friends meet at foosball table? Or does your company boast such table?<br />
            It's about time to have the game brought to the next level!<br />
        </p>
        <p>
            Compete with your friends, compare your achievements, keep your duels history<br />
            and have lots of fun with TFoosball.
        </p>
        <TeamCreationForm />
        {props.children}
        </Grid>
    </Jumbotron>
