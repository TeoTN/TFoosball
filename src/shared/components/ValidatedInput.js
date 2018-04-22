import React from 'react'
import { ControlLabel, FormControl, FormGroup, Col, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';


const withLabel = (InputComponent) => ({label, xsLabel, smLabel, mdLabel, lgLabel, xsHiddenLabel, maxSize = 12, ...props}) => {
    const inv = size => size ? maxSize - size : undefined;
    if (!label) return (<InputComponent {...props} />);
    return (
        <div>
            <Col xs={xsLabel} sm={smLabel} md={mdLabel} lg={lgLabel} xsHidden={xsHiddenLabel} className="text-right">
                    <ControlLabel>{label}</ControlLabel>
            </Col>
            <Col xs={inv(xsLabel)} sm={inv(smLabel)} md={inv(mdLabel)} lg={inv(lgLabel)}>
                <InputComponent {...props} />
            </Col>
        </div>
    );
};

const withErrorTooltip = (WrappedComponent) => ({errorMsg, hasError, ...props}) => {
    return (
        <React.Fragment>
            <WrappedComponent {...props} />
            { hasError && <HelpBlock>{ errorMsg.toString() }</HelpBlock> }
        </React.Fragment>
    );
};

const withValidation = (InputComponent) => class extends React.Component {
    render() {
        const { placeholder, input, meta: {error, dirty}, ...otherProps } = this.props;

        return (
            <FormGroup controlId={input.name} validationState={error && dirty ? 'error' : null}>
                <InputComponent
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                    hasError={dirty && error}
                    errorMsg={error}
                    {...otherProps}
                />
            </FormGroup>
        );
    }
};

export const FieldInput = ({ input, type, placeholder, ...props}) => {
    return (
        <FormControl
            type={type}
            placeholder={placeholder}
            value={input.value}
            onChange={input.onChange}
            {...props}
        />
    )
};

export const StaticValidatedInput = withValidation(Select.Creatable);
export const ValidatedInput = withValidation(withLabel(withErrorTooltip(FormControl)));
export const StaticValidatedAsyncInput = withValidation(Select);
export const ValidatedAsyncInput = withValidation(withLabel(withErrorTooltip(Select.Creatable)));
export default ValidatedInput;
