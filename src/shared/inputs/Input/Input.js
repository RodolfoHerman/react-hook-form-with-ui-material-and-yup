import React, { memo, useCallback } from "react";

import InputMask from "react-input-mask";
import { useControlled } from "../hooks/useControlled";
import InputHookFormWrapper from "../InputHookFormWrapper";
import PropTypes from "prop-types";
import StyledInput from "../StyledInput";

const InputComponent = React.forwardRef(({
    name,
    label,
    type = "text",
    value,
    onlyNumber = false,
    disabled = false,
    readOnly = false,
    maxLength,
    iconStart,
    iconEnd,
    mask,
    maskChar = "",
    placeholder,
    helperText,
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

        if(onlyNumber === true) {
            target.value = target.value.replace(/\D/g, "");
        }

        if(target.value !== valueProp) {
            setvalueProp(target.value);
            callback && callback(event);
        }
    }, [onlyNumber, valueProp, setvalueProp]);

    return !!mask ? (
        <InputMask 
            name={name}
            mask={mask}
            value={valueProp}
            maskChar={maskChar}
            placeholder={placeholder}
            onChange={handleInputChange(onChange)}
            onBlur={onBlur}
            disabled={disabled}
            readOnly={readOnly}
            type={type}
        >
            {(inputprops) => (
                <StyledInput 
                    {...inputprops}
                    label={label}
                    helperText={getHelper()}
                    error={!!errors[name]}
                    maxLength={maxLength}
                    iconStart={iconStart}
                    iconEnd={iconEnd}
                    value={valueProp}
                    ref={ref}
                    classes={classes}
                />
            )}
        </InputMask>
    ) : (
        <StyledInput 
            onChange={handleInputChange(onChange)}
            onBlur={onBlur}
            ref={ref}
            name={name}
            value={valueProp}
            placeholder={placeholder}
            label={label}
            type={type}
            helperText={getHelper()}
            error={!!errors[name]}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            iconStart={iconStart}
            iconEnd={iconEnd}
            classes={classes}
        />
    )
})

const Input = (
    props = {
        name: undefined,
        label: undefined,
        value: undefined,
        type: undefined,
        onlyNumber: undefined,
        disabled: undefined,
        readOnly: undefined,
        maxLength: undefined,
        iconStart: undefined,
        iconEnd: undefined,
        mask: undefined,
        maskChar: undefined,
        placeholder: undefined,
        helperText: undefined,
        classes: undefined,
    }
) => <InputHookFormWrapper Element={InputComponent} {...props} />

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    value: PropTypes.string,
    type: PropTypes.string,
    onlyNumber: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.number,
    iconStart: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    iconEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    placeholder: PropTypes.string,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    classes: PropTypes.object,
}

export default memo(Input);
