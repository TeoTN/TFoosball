import React from 'react';
import { Col, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import GlyphButton from "../../shared/components/GlyphButton";
import { Field, reduxForm } from "redux-form";
import {
    FieldInput,
    ValidatedAsyncInput
} from "../../shared/components/ValidatedInput";


const JoinTeamForm = ({team, username, autocompletion, fetchAutocompletion, action, handleSubmit}) => (
    <Form onSubmit={handleSubmit(action)} horizontal>
        <Field
            autoFocus
            name='name'
            label="Club name"
            smLabel={2}
            xsHiddenLabel
            maxSize={8}
            component={ValidatedAsyncInput}
            options={autocompletion.teamNames}
            onInputChange={fetchAutocompletion}
            isLoading={autocompletion.loading}
            placeholder="Enter club name..."
            promptTextCreator={input => `Join ${input} club...`}
        />
        <FormGroup>
            <Col xsHidden sm={2} className="text-right">
                <ControlLabel>Nickname</ControlLabel>
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    component={FieldInput}
                    name="username"
                    placeholder="Enter new username..."
                />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10}>
                <GlyphButton type="submit" glyph="log-in" bsSize="small" bsStyle="primary">
                    Join the club
                </GlyphButton>
            </Col>
        </FormGroup>
    </Form>
);

export default reduxForm({form: 'clubJoin'})(JoinTeamForm);
