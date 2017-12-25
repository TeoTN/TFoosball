import React from 'react';
import {Form, FormGroup, Row, Col, Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import {ValidatedAsyncInput} from '../../shared/components/ValidatedInput';
import {isEmail} from '../../validators';
import { getAutocompletionState } from "../../users/users.reducer";
import { connect } from "react-redux";
import { fetchEmailAutocompletion, inviteUser } from "../../users/users.actions";

const mapStateToProps = (state) => ({
    teams: state.teams,
    autocompletion: getAutocompletionState(state),
});
const mapDispatchToProps = (dispatch) => ({
    fetchEmailAutocompletion: (input) => dispatch(fetchEmailAutocompletion(input)),
    submitInvitation: ({email}) => dispatch(inviteUser(email.value)),
});

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({form: 'teamInvite'})
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
        } = this.props;
        const isEmailWrapped = (value, allValues, props) => isEmail(value ? value.value : '', allValues, props);
        return (
            <Row>
                <Col xs={12} sm={8}>
                    <Form onSubmit={handleSubmit(submitInvitation)} horizontal>
                        <Field
                            name='email'
                            label="Email"
                            component={ValidatedAsyncInput}
                            validate={isEmailWrapped}
                            options={emails}
                            onInputChange={fetchEmailAutocompletion}
                            isLoading={loading}
                            smLabel={3}
                            placeholder="Friend's email"
                            promptTextCreator={label => `Send invitation to ${label}`}
                        />
                        <FormGroup>
                            <Col smOffset={3} sm={9}>
                                <Button type="submit" bsStyle={pristine || invalid ? 'default' : 'success'} block
                                        disabled={pristine || invalid}>
                                    Invite
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default TeamInvite;
