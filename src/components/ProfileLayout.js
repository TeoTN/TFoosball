import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Col, Image } from 'react-bootstrap';
import { fetchProfile } from '../api/connectors';
import { receiveProfile } from '../actions/profile.actions';
import { withRouter } from 'react-router';
import { ensureSuccessOr, ensureJSON } from '../api/helpers';
import { raiseError } from '../actions/error.actions';
import spinner from '../assets/img/loading.gif';

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
            .then(ensureSuccessOr('Failed to get user profile'))
            .then(ensureJSON)
            .then(receiveProfile)
            .then(() => this.setState({ loading: false }))
            .catch(raiseError);
    }

    render() {
        const { children, profile, params: {username}} = this.props;
        const { loading } = this.state;
        return (
            <div>
                <h1>Profile <small>{ username }</small></h1>
                <Row>
                    <Col sm={5}>
                        <ProfileStats profile={profile} />
                    </Col>
                    <Col sm={7}>
                        {
                            loading ?
                                <Image src={spinner} responsive /> :
                                <ProfileChart exp_history={profile.exp_history}/>
                        }
                    </Col>
                </Row>
                {children}
            </div>
        );
    }
}