import React from 'react';
import { Button, Col, ControlLabel, Form, FormGroup } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { ControlledSwitch } from "../../profile/components/SettingsForm";


class ManageMember extends React.PureComponent {
    render() {
        const {handleSubmit, manageUser, pristine} = this.props;
        return (
            <div>
                <h4>Managing {this.props.initialValues.username}</h4>
                <p><a href='/clubs/admin' className="xs-text-small">Back to user list</a></p>
                <Form onSubmit={handleSubmit(manageUser)} horizontal>
                    <FormGroup>
                        <Col sm={3} className="text-right">
                            <ControlLabel>Admin powers</ControlLabel>
                        </Col>
                        <Col sm={9}>
                            <Field type="checkbox" component={ControlledSwitch} name="is_team_admin"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={3} className="text-right">
                            <ControlLabel>Deactivated</ControlLabel>
                        </Col>
                        <Col sm={9}>
                            <Field type="checkbox" component={ControlledSwitch} name="hidden"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={3}>
                            <Button type="submit" bsStyle={pristine ? 'default' : 'success'} block disabled={pristine}>
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default reduxForm({
    enableReinitialize: true,
    form: 'memberMgmt',
})(ManageMember);
