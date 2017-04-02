import React from 'react'
import { ControlLabel, FormControl, FormGroup, Col } from 'react-bootstrap';


export default class SettingsInput extends React.Component {

    render () {
        const { placeholder, type, input, meta, label } = this.props;

        return (
            <FormGroup controlId={input.name} validationState={meta.error ? 'error' : null}>
                <Col componentClass={ControlLabel} sm={3}>{label}:</Col>
                <Col sm={8}>
                <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
                </Col>
                {/*<FormControl.Feedback />*/}
            </FormGroup>
        );
    }
}
