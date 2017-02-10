import React from 'react';
import { Jumbotron, Row, Col, Form, FormGroup, FormControl, Button, Grid } from 'react-bootstrap';
import jumbo from '../../assets/img/jumbotron.jpg';

export default (props) =>
    <Jumbotron style={{background: `url(${jumbo})`, color: 'white'}}>
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
        <Form>
            <FormGroup>
                <Row>
                    <Col xs={3}>
                        <FormControl/>
                    </Col>
                    <Button bsStyle="success">Create a new team</Button>
                </Row>
                <Row>
                <Col xs={12}>
                    <h6>We will ask you kindly to sign up with Google while proceeding</h6>
                </Col>
                </Row>
            </FormGroup>
        </Form>
        {props.children}
        </Grid>
    </Jumbotron>
