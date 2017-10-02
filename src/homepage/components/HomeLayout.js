import React from 'react'
import {connect} from "react-redux";
import {signIn} from "../../shared/auth/auth.actions";
import HomeJumbotron from "./HomeJumbotron";
import MobileHomepage from "./MobileHomepage";
import PromoBar from "./PromoBar";

const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
});

const HomeLayout = ({signIn}) => {
    return (
        <div>
            <div className="hidden-xs hidden-sm">
                <HomeJumbotron />
                <PromoBar />
            </div>
            <div className="hidden-md hidden-lg">
                <MobileHomepage onSignIn={signIn} />
            </div>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(HomeLayout)
