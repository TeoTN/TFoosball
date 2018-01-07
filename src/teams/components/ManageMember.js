import React from 'react';
import { Button, Col, ControlLabel, Form, FormGroup } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { ControlledSwitch } from "../../profile/components/SettingsForm";


class ManageMember extends React.PureComponent {
    render() {
        const {handleSubmit, manageUser, pristine} = this.props;
        return (
            <Form onSubmit={handleSubmit(manageUser)} horizontal>
                <FormGroup>
                    <Col xs={5} sm={3} className="text-right">
                        <ControlLabel>Admin powers</ControlLabel>
                    </Col>
                    <Col xs={7} sm={9}>
                        <Field type="checkbox" component={ControlledSwitch} name="is_team_admin"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col xs={5} sm={3} className="text-right">
                        <ControlLabel>Deactivated</ControlLabel>
                    </Col>
                    <Col xs={7} sm={9}>
                        <Field type="checkbox" component={ControlledSwitch} name="hidden"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col xsOffset={5} smOffset={3} sm={3}>
                        <Button type="submit" bsStyle={pristine ? 'default' : 'success'} block disabled={pristine}>
                            Save
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default reduxForm({
    enableReinitialize: true,
    form: 'memberMgmt',
})(ManageMember);
