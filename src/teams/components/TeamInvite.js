import React from 'react';
import { Form, FormGroup, Col, Button, ControlLabel } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { ValidatedAsyncInput } from '../../shared/components/ValidatedInput';
import { isEmail } from '../../validators';
import { getAutocompletionState } from "../../users/users.reducer";
import { connect } from "react-redux";
import { fetchEmailAutocompletion, inviteUser } from "../../users/users.actions";
import Icon from 'react-fontawesome';
import PanelHeader from "../../shared/PanelHeader";


const mapStateToProps = (state) => ({
    teams: state.teams,
    autocompletion: getAutocompletionState(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchEmailAutocompletion: (input) => {
        dispatch(fetchEmailAutocompletion(input));
        return input;
    },
    submitInvitation: ({email}) => dispatch(inviteUser(email.value)),
});

class TeamInvite extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {value: '', loading: false};
    }

    render() {
        const {
            pristine,
            invalid,
            fetchEmailAutocompletion,
            autocompletion: {loading, emails},
            submitInvitation,
            handleSubmit,
            selectedTeam
        } = this.props;
        const isEmailWrapped = (value, allValues, props) => isEmail(value ? value.value : '', allValues, props);
        return (
            <React.Fragment>
                <PanelHeader title={`Invite to ${selectedTeam.name}`} glyph="id-badge" isAwesome/>
                <Form onSubmit={handleSubmit(submitInvitation)} horizontal>
                    <Col sm={2}>
                        <ControlLabel>Email</ControlLabel>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field
                            autofocus
                            name='email'
                            component={ValidatedAsyncInput}
                            validate={isEmailWrapped}
                            options={emails}
                            onInputChange={fetchEmailAutocompletion}
                            isLoading={loading}
                            placeholder="Friend's email"
                            promptTextCreator={input => `Send invitation to ${input}`}
                        />
                    </Col>
                    <FormGroup>
                        <Col xs={12} sm={2}>
                            <Button type="submit" bsStyle={pristine || invalid ? 'default' : 'success'} block
                                    disabled={pristine || invalid}>
                                Invite
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'teamInvite'})(TeamInvite));
