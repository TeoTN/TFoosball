import React from 'react'
import TeamCreationForm from "./TeamCreationForm";
import OrBall from "../../shared/components/OrBall";
import SignInButton from "../../shared/components/SignInButton";

const MobileHomepage = ({onSignIn, onCreateTeam}) => {
    return (
        <div className="mobile-jumbotron">
            <h5 className="text-right" style={{margin: '40px 0'}}>
                Your personal application for tracking table football achievements.
            </h5>
            <SignInButton signIn={onSignIn} block/>
            <OrBall />
            <TeamCreationForm action={onCreateTeam}/>
        </div>
    );
};

export default MobileHomepage;
