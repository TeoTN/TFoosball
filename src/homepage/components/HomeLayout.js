import React from 'react'
import {connect} from "react-redux";
import {signIn} from "../../shared/auth/auth.actions";
import HomeJumbotron from "./HomeJumbotron";
import MobileHomepage from "./MobileHomepage";
import PromoBar from "./PromoBar";
import { requestCreateTeam } from "../../teams/teams.actions";

const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
    createTeam: (team, username) => dispatch(requestCreateTeam(team, username)),
});

class HomeLayout extends React.Component {
    constructor(props) {
        super(props);
        // TODO Extract isMobile to global state
        this.mediaQuery = window.matchMedia('(min-width: 769px');
        this.state = {
            isMobile: this.mediaQuery.matches,
        };
    }

    componentDidMount() {
        this.mediaQuery.addListener(this.onMediaChange);
    }

    onMediaChange = ({matches}) => this.setState({isMobile: matches});

    render() {
        const {signIn, createTeam} = this.props;
        return (
            window.matchMedia("(min-width: 769px)").matches ?
                <div>
                    <HomeJumbotron onCreateTeam={createTeam} />
                    <PromoBar />
                </div> :
                <MobileHomepage onSignIn={signIn} onCreateTeam={createTeam} />
        );
    }
}

export default connect(null, mapDispatchToProps)(HomeLayout)
