import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Button, Panel, ButtonGroup } from 'react-bootstrap';
import { fetchProfile } from '../api/connectors';
import { receiveProfile } from '../actions/profile.actions';
import { withRouter } from 'react-router';
import { raiseError } from '../actions/error.actions';
import { LinkContainer } from 'react-router-bootstrap';


const mapStateToProps = ({profile}) => ({profile});
const mapDispatchToProps = dispatch => ({
    receiveProfile: (response) => dispatch(receiveProfile(response)),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class ProfileLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }
    componentWillMount() {
        this.fetchData();
    }

    componentDidUpdate({params: {username}}) {
        if (username !== this.props.params.username) {
            this.fetchData();
        }
    }

    fetchData() {
        const {receiveProfile, raiseError, params: {username}} = this.props;
        this.setState({ loading: true });
        fetchProfile(username)
            .then(receiveProfile)
            .then(() => this.setState({ loading: false }))
            .catch(raiseError);
    }

    render() {
        const { children, profile, params: {username}} = this.props;
        const { loading } = this.state;
        return (
            <div>
                <h1>Profile &nbsp;<small>{ username }</small></h1>
                <Panel>
                    <ButtonGroup>
                        <LinkContainer to={{ pathname: `/profile/${username}`}}>
                            <Button bsSize="xsmall" bsStyle="info">Profile stats</Button>
                        </LinkContainer>
                        <LinkContainer to={{ pathname: `/profile/${username}/matches`}}>
                            <Button bsSize="xsmall" bsStyle="info">Profile matches</Button>
                        </LinkContainer>
                    </ButtonGroup>
                </Panel>
                { children ?
                    children :
                    <Row>
                        <ProfileStats profile={profile}/>
                        <ProfileChart
                            exp_history={profile.exp_history}
                            loading={loading}
                        />
                    </Row>
                }
            </div>
        );
    }
}