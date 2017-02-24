import React from 'react'
import InputField from './InputField';
import { Form, FormGroup, Button, Col } from 'react-bootstrap';

const MemberSettings = ({saveMember, handleChange, username}) => {
    return (
        <Form onSubmit={saveMember} horizontal>
            <fieldset>
                <legend>Personal</legend>
                <InputField
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    value={username}
                />
                <FormGroup>
                    <Col smOffset={3} sm={8}>
                        <Button type="submit" bsStyle="success" block>
                            Save
                        </Button>
                    </Col>
                </FormGroup>
            </fieldset>
        </Form>
    );
};

export default MemberSettings;
