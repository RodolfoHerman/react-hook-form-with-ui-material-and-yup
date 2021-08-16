import React, { memo, useCallback } from "react";

import { useControlled } from "../hooks/useControlled";
import InputHookFormWrapper from "../InputHookFormWrapper";
import PropTypes from "prop-types";
import { 
    FormControl, 
    FormGroup, 
    FormHelperText, 
    FormLabel, 
    makeStyles 
} from "@material-ui/core";
import StyledCheckbox from "../StyledCheckbox";
import clsx from "clsx";

const useStyle = makeStyles(() => ({
    fieldSet: {
        width: "100%",
        marginBottom: 5,

        "& legend": {
            fontSize: 13,
            color: "rgba(0, 0, 0, 0.54)",
            fontWeight: 800,
            fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
            lineHeight: 1,
            letterSpacing: "0.00938em",
            marginBottom: 2,
        },
    }
}))

const CheckboxComponent = React.forwardRef(({
    name,
    value,
    title,
    label,
    disabled,
    labelPlacement = "end",
    checkboxIcon,
    checkedboxIcon,
    helperText,
    onChange,
    onBlur,
    errors,
    classes = {},
}, ref) => {
    const className = useStyle();

    const [valueProp, setvalueProp] = useControlled({
        controlled: value,
        defaultState: false,
    });

    const getHelper = () => {
        return !!helperText
            ? helperText
            : errors[name]?.message;
    }

    const handleChange = useCallback((callback) => (event) => {
        const { target } = event;

        if(target.checked !== valueProp) {
            setvalueProp(target.checked);
            callback && callback(event);
        }
    }, [valueProp, setvalueProp]);

    return (
        <FormControl
            error={!!errors[name]}
            component="fieldset"
            className={clsx(className.fieldSet, classes.fieldSet)}
        >
            {
                !!title && <FormLabel focused={false} component="legend">
                    { title }
                </FormLabel>
            }
            <FormGroup>
                <StyledCheckbox 
                    label={label}
                    labelPlacement={labelPlacement}
                    disabled={disabled}
                    checked={valueProp}
                    value={valueProp}
                    checkboxIcon={checkboxIcon}
                    checkedboxIcon={checkedboxIcon}
                    onChange={handleChange(onChange)}
                    onBlur={onBlur}
                    ref={ref}
                    classes={classes}
                />
            </FormGroup>
            {
                !!getHelper() && <FormHelperText>
                    { getHelper() }
                </FormHelperText>
            }
        </FormControl>
    )
})

const Checkbox = (
    props = {
        name: undefined,
        checked: undefined,
        title: undefined,
        label: undefined,
        disabled: undefined,
        labelPlacement: undefined,
        checkboxIcon: undefined,
        checkedboxIcon: undefined,
        helperText: undefined,
        classes: undefined,
    }
) => <InputHookFormWrapper Element={CheckboxComponent} {...props} value={props.checked || false} />

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    disabled: PropTypes.bool,
    labelPlacement: PropTypes.string,
    checkboxIcon: PropTypes.element,
    checkedboxIcon: PropTypes.element,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    classes: PropTypes.object,
}

export default memo(Checkbox);
