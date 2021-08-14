import React, { memo, useCallback } from "react";

import InputMask from "react-input-mask";
import { useControlled } from "../hooks/useControlled";
import InputHookFormWrapper from "../InputHookFormWrapper";
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
        >
            {(inputprops) => (
                <StyledInput 
                    {...inputprops}
                    label={label}
                    type={type}
                    helperText={getHelper()}
                    error={!!errors[name]}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    iconStart={iconStart}
                    iconEnd={iconEnd}
                    value={valueProp}
                    inputRef={ref}
                    classes={classes}
                />
            )}
        </InputMask>
    ) : (
        <StyledInput 
            onChange={handleInputChange(onChange)}
            onBlur={onBlur}
            inputRef={ref}
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

export default memo(Input);
