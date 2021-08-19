import React, { memo, useCallback } from "react";

import { useControlled } from "../hooks/useControlled";
import InputHookFormWrapper from "../InputHookFormWrapper";
import PropTypes from "prop-types";
import StyledInput from "../StyledInput";

const TextAreaComponent = React.forwardRef(({
    name,
    label,
    value,
    disabled = false,
    readOnly = false,
    maxLength,
    placeholder,
    helperText,
    minRows = 4,
    maxRows = 6,
    onChange,
    onBlur,
    errors,
    classes = {},
}, ref) => {
    const [valueProp, setvalueProp] = useControlled({
        controlled: value,
        defaultState: "",
    });

    const getHelper = () => {
        return !!helperText
            ? helperText
            : errors[name]?.message;
    }

    const handleInputChange = useCallback((callback) => (event) => {
        const { target } = event;

        if(target.value !== valueProp) {
            setvalueProp(target.value);
            callback && callback(event);
        }
    }, [valueProp, setvalueProp]);

    return (
        <StyledInput 
            onChange={handleInputChange(onChange)}
            onBlur={onBlur}
            ref={ref}
            name={name}
            value={valueProp}
            placeholder={placeholder}
            label={label}
            helperText={getHelper()}
            error={!!errors[name]}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            multiline
            minRows={minRows}
            maxRows={maxRows}
            classes={classes}
        />
    )
})

const TextArea = (
    props = {
        name: undefined,
        label: undefined,
        value: undefined,
        disabled: undefined,
        readOnly: undefined,
        maxLength: undefined,
        placeholder: undefined,
        helperText: undefined,
        minRows: undefined,
        maxRows: undefined,
        classes: undefined,
    }
) => <InputHookFormWrapper Element={TextAreaComponent} {...props} />

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    value: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
    classes: PropTypes.object,
}

export default memo(TextArea);
