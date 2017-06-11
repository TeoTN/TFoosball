import React from 'react';
import {Jumbotron, Grid, Row, Col} from 'react-bootstrap';
import TeamCreationForm from './TeamCreationForm';
import SignInButton from "../../shared/components/SignInButton";
import {connect} from "react-redux";
import {signIn} from "../../shared/auth/auth.actions";
import OrBall from "../../shared/components/OrBall";


const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
});

const IntroLayout = ({signIn, children}) =>
    <Jumbotron>
        <Grid>
            <Row>
                <Col xsHidden smHidden>
                    <h1>Make it funny, again!</h1>
                    <p className="text-muted">
                        Do you and your friends meet at foosball table? Or does your company boast such table?<br />
                        It's about time to have the game brought to the next level!<br />
                    </p>
                    <p className="text-muted">
                        Compete with your friends, compare your achievements, keep your duels history<br />
                        and have lots of fun with TFoosball.
                    </p>
                    <TeamCreationForm />
                    {children}
                </Col>
                <Col mdHidden lgHidden xs={12} sm={12}>
                    <h5 className="text-right" style={{margin: '40px 0'}}>
                        Your personal application for tracking table football achievements.
                    </h5>
                    <SignInButton signIn={signIn} block/>
                    <OrBall />
                    <TeamCreationForm />
                </Col>
            </Row>
        </Grid>
    </Jumbotron>;

export default connect(null, mapDispatchToProps)(IntroLayout)
