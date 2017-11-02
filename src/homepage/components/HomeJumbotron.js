import React from 'react'
import {Col, Grid, Jumbotron, Row} from "react-bootstrap";
import TeamCreationForm from "./TeamCreationForm";

const HomeJumbotron = () => {
    return (
        <Jumbotron>
            <Grid>
                <Row>
                    <Col xsHidden smHidden>
                        <h1>Make it funny, again!</h1>
                        <p>
                            Do you meet with your friends at a football table? Does your company boast a football table?<br />
                            This app is for you and it's high time to bring the game to the next level!<br />
                        </p>
                        <br/>
                        <br/>
                        <br/>
                        <p className="hidden">
                            Compete with your friends, compare your achievements, keep your duels history<br />
                            and have lots of fun with TFoosball.
                        </p>
                        <TeamCreationForm />
                    </Col>
                </Row>
            </Grid>
        </Jumbotron>
    );
};

export default HomeJumbotron;
