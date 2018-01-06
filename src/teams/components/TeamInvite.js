import React from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, Row } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { ValidatedAsyncInput } from '../../shared/components/ValidatedInput';
import { isEmail } from '../../validators';
import { getAutocompletionState } from "../../users/users.reducer";
import { connect } from "react-redux";
import { fetchEmailAutocompletion, inviteUser } from "../../users/users.actions";

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
    })
;

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
            <div>
                <Form onSubmit={handleSubmit(submitInvitation)} horizontal>
                    <Row>
                        <Col smOffset={2} sm={10}>
                            <ControlLabel className='h4'>
                                Invite to new member to {selectedTeam.name} club
                            </ControlLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={10}>
                            <Field
                                autofocus
                                name='email'
                                label="Email"
                                component={ValidatedAsyncInput}
                                validate={isEmailWrapped}
                                options={emails}
                                onInputChange={fetchEmailAutocompletion}
                                isLoading={loading}
                                smLabel={2}
                                placeholder="Friend's email"
                                promptTextCreator={input => `Send invitation to ${input}`}
                            />
                        </Col>
                        <Col sm={2}>
                            <FormGroup>
                                <Button type="submit" bsStyle={pristine || invalid ? 'default' : 'success'} block
                                        disabled={pristine || invalid}>
                                    Invite
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'teamInvite'})(TeamInvite));
