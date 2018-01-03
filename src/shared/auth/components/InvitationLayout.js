import React from 'react';
import {Grid, Panel} from "react-bootstrap";
import {connect} from "react-redux";
import Loading from "../../components/Loading";

const mapStateToProps = ({auth}) => ({auth});

class InvitationLayout extends React.PureComponent {
    render() {
        const {auth: {activate}} = this.props;
        return (
            <Grid>
                <Panel>
                <h1>Welcome to TFoosball</h1>
                {
                    activate.pending ?
                        <Loading/> :
                        activate.success ?
                            <p>All good</p> :
                            <p>
                                Failed to activate user. Please ensure that:
                                <ul>
                                    <li>Activation code was sent no longer than 48 hours ago</li>
                                    <li>The code was sent by TFoosball</li>
                                    <li>You've logged in with the same email as the invited one</li>
                                    <li>You are using an email in Google services</li>
                                    <li>You haven't already used that invitation link</li>
                                </ul>
                            </p>
                }
                </Panel>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, null)(InvitationLayout);
