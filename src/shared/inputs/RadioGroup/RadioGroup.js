import React, { memo, useCallback } from "react";

import { 
    FormControl,
    FormHelperText, 
    FormLabel, 
    makeStyles, 
    RadioGroup as RadioGroupMaterial 
} from "@material-ui/core";
import clsx from "clsx";
import * as _ from "lodash";
import PropTypes from "prop-types";
import { useControlled } from "../hooks/useControlled";
import InputHookFormWrapper from "../InputHookFormWrapper";
import StyledRadio from "../StyledRadio";


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

const RadioGroupComponent = React.forwardRef(({
    name,
    value,
    options = [],
    optionsCustom = [],
    title,
    labelPlacement = "end",
    direction = "column",
    radioIcon,
    checkedRadioIcon,
    helperText,
    onChange,
    onBlur,
    errors,
    classes= {},
}, ref) => {
    const className = useStyle();
    const [valueProp, setvalueProp] = useControlled({
        controlled: value,
        defaultState: "",
    });

    const getHelper = () => {
        return !!helperText
            ? helperText
            : errors[name]?.message;
    }

    const getOptions = () => {
        return _.isEmpty(optionsCustom)
            ? options.map((option, index) => (
                <StyledRadio 
                    key={`${name}_${index}`}
                    label={option.label}
                    labelPlacement={labelPlacement}
                    disabled={option.disabled}
                    value={option.value}
                    radioIcon={radioIcon}
                    checkedRadioIcon={checkedRadioIcon}
                    classes={classes}
                />
            ))
            : optionsCustom.map((OptionCustom, index) => (
                <OptionCustom 
                    key={`${name}_${index}`}
                    actualValue={valueProp}
                />
            ))
    }

    const handleInputChange = useCallback((callback) => (event) => {
        const { target } = event;

        if(target.value !== valueProp) {
            setvalueProp(target.value);
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
            <RadioGroupMaterial
                name={name}
                value={valueProp}
                onChange={handleInputChange(onChange)}
                onBlur={onBlur}
                ref={ref}
                style={{ flexDirection: direction }}
            >
                { getOptions() }
            </RadioGroupMaterial>
            {
                !!getHelper() && <FormHelperText>
                    { getHelper() }
                </FormHelperText>
            }
        </FormControl>
    )
})

const RadioGroup = (
    props = {
        name: undefined,
        value: undefined,
        options: undefined,
        optionsCustom: undefined,
        title: undefined,
        labelPlacement: undefined,
        direction: undefined,
        radioIcon: undefined,
        checkedRadioIcon: undefined,
        helperText: undefined,
        classes: undefined,
    }
) => <InputHookFormWrapper Element={RadioGroupComponent} {...props} />

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            value: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })
    ),
    optionsCustom: PropTypes.arrayOf(PropTypes.func),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    labelPlacement: PropTypes.string,
    direction: PropTypes.string,
    radioIcon: PropTypes.element,
    checkedRadioIcon: PropTypes.element,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    classes: PropTypes.object,
}

export default memo(RadioGroup);
