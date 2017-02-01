import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

const InputField = ({ label, name, value, onChange }) => (
    <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>
            { label }
        </Col>
        <Col sm={8}>
            <FormControl
                type="text"
                value={value}
                onChange={onChange(name)}
            />
        </Col>
    </FormGroup>
);

export default InputField;
