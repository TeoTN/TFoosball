import React from 'react';
import {Form, FormGroup, Row, Col, Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import {ValidatedAsyncInput} from '../../shared/components/ValidatedInput';
import {isEmail} from '../../validators';


@reduxForm({form: 'teamInvite'})
class TeamInvite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', loading: false};
    }

    render() {
        const {pristine, loadingEmailAutocompletion, emailAutocompletion, fetchEmailAutocompletion} = this.props;
        const isEmailWrapped = (value, allValues, props) => isEmail(value ? value.value : '', allValues, props);
        return (
            <Row>
                <Col xs={12} sm={8}>
                    <Form onSubmit={this.handleSubmit} horizontal>
                        <Field
                            name='email'
                            label="Email"
                            component={ValidatedAsyncInput}
                            validate={isEmailWrapped}
                            options={emailAutocompletion}
                            onInputChange={fetchEmailAutocompletion}
                            isLoading={loadingEmailAutocompletion}
                            smLabel={3}
                            placeholder="Friend's email"
                        />
                        <FormGroup>
                            <Col smOffset={3} sm={9}>
                                <Button type="submit" bsStyle={pristine ? 'default' : 'success'} block
                                        disabled={pristine}>
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
