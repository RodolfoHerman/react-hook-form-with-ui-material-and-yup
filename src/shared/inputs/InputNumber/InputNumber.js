import React, { memo } from "react";
import NumberFormat from "react-number-format";

import { useControlled } from "../hooks/useControlled";
import InputHookFormWrapper from "../InputHookFormWrapper";
import PropTypes from "prop-types";
import StyledInput from "../StyledInput";


const InputNumberComponent = React.forwardRef(({
    name,
    label,
    value,
    type = "tel",
    disabled = false,
    onlyNumber = false,
    readOnly = false,
    maxLength,
    iconStart,
    iconEnd,
    mask,
    placeholder,
    helperText,
    prefix,
    suffix,
    decimalSeparator = ",",
    thousandSeparator = ".",
    decimalScale = 2,
    fixedDecimalScale = true,
    isNumericString = false,
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

    const handleInputChange = ({ floatValue, formattedValue }) => {
        if(onlyNumber === true) {
            setvalueProp(floatValue);
            onChange(floatValue);
        } else {
            setvalueProp(formattedValue);
            onChange(formattedValue);
        }
    }

    return (
        <NumberFormat 
            onValueChange={handleInputChange}
            value={valueProp}
            name={name}
            label={label}
            value={value}
            type={type}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            iconStart={iconStart}
            iconEnd={iconEnd}
            format={mask}
            placeholder={placeholder}
            prefix={prefix}
            suffix={suffix}
            decimalSeparator={decimalSeparator}
            thousandSeparator={thousandSeparator}
            decimalScale={decimalScale}
            fixedDecimalScale={fixedDecimalScale}
            isNumericString={isNumericString}
            error={!!errors[name]}
            helperText={getHelper()}
            onBlur={onBlur}
            inputRef={ref}
            classes={classes}
            customInput={StyledInput}
        />
    )
})


const InputNumber = (
    props = {
        name: undefined,
        label: undefined,
        value: undefined,
        type: undefined,
        disabled: undefined,
        onlyNumber: undefined,
        readOnly: undefined,
        maxLength: undefined,
        iconStart: undefined,
        iconEnd: undefined,
        mask: undefined,
        placeholder: undefined,
        helperText: undefined,
        prefix: undefined,
        suffix: undefined,
        decimalSeparator: undefined,
        thousandSeparator: undefined,
        decimalScale: undefined,
        fixedDecimalScale: undefined,
        isNumericString: undefined,
        classes: undefined,
    }
) => <InputHookFormWrapper Element={InputNumberComponent} {...props} />

InputNumber.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    value: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onlyNumber: PropTypes.bool,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.number,
    iconStart: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    iconEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    mask: PropTypes.string,
    placeholder: PropTypes.string,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    decimalSeparator: PropTypes.string,
    thousandSeparator: PropTypes.string,
    decimalScale: PropTypes.number,
    fixedDecimalScale: PropTypes.bool,
    isNumericString: PropTypes.bool,
    classes: PropTypes.object,
}

export default memo(InputNumber);
