import React from 'react'
import {connect} from "react-redux";
import {signIn} from "../../shared/auth/auth.actions";
import HomeJumbotron from "./HomeJumbotron";
import MobileHomepage from "./MobileHomepage";
import PromoBar from "./PromoBar";

const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
});

const HomeLayout = ({signIn}) => (
    window.matchMedia("(min-width: 769px)").matches ?
        <div>
            <HomeJumbotron />
            <PromoBar />
        </div> :
        <MobileHomepage onSignIn={signIn} />
);

export default connect(null, mapDispatchToProps)(HomeLayout)
