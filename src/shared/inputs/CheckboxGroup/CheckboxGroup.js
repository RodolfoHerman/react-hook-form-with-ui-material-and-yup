import React, { memo, useCallback } from "react";

import { 
    FormControl,
    FormGroup,
    FormHelperText, 
    FormLabel, 
    makeStyles, 
} from "@material-ui/core";
import clsx from "clsx";
import * as _ from "lodash";
import PropTypes from "prop-types";
import { useControlled } from "../hooks/useControlled";
import InputHookFormWrapper from "../InputHookFormWrapper";
import StyledCheckbox from "../StyledCheckbox";


const useStyle = makeStyles(() => ({
    fieldSet: {
        width: "100%",
        marginBottom: 15,

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

const CheckboxGroupComponent = React.forwardRef(({
    name,
    value = [],
    items = [],
    itemsCustom = [],
    title,
    labelPlacement = "end",
    direction = "column",
    checkboxIcon,
    checkedboxIcon,
    helperText,
    onChange,
    onBlur,
    errors,
    classes= {},
}, ref) => {
    const className = useStyle();
    const [valuesProp, setvaluesProp] = useControlled({
        controlled: value,
        defaultState: [],
    });

    const getHelper = () => {
        return !!helperText
            ? helperText
            : errors[name]?.message;
    }

    const getOptions = () => {
        return _.isEmpty(itemsCustom)
            ? items.map((item, index) => (
                <StyledCheckbox 
                    key={`${name}_${index}`}
                    label={item.label}
                    labelPlacement={labelPlacement}
                    disabled={item.disabled}
                    checked={valuesProp.includes(item.value)}
                    value={item.value}
                    checkboxIcon={checkboxIcon}
                    checkedboxIcon={checkedboxIcon}
                    onChange={handleInputChange(onChange)}
                    onBlur={onBlur}
                    ref={ref}
                    classes={classes}
                />
            ))
            : itemsCustom.map((ItemsCustom, index) => (
                <ItemsCustom 
                    key={`${name}_${index}`}
                    actualCheckeds={valuesProp}
                />
            ))
    }

    const handleInputChange = useCallback((callback) => (event) => {
        const { target } = event;
        const newValues = valuesProp.includes(target.value)
            ? valuesProp.filter((val) => val !== target.value)
            : [...valuesProp, target.value];

        if(!_.isEqual(_.sortBy(newValues), _.sortBy(valuesProp))) {
            setvaluesProp(newValues);
            callback && callback(newValues);
        }
    }, [valuesProp, setvaluesProp]);

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
            <FormGroup style={{ flexDirection: direction }}>
                { getOptions() }
            </FormGroup>
            {
                !!getHelper() && <FormHelperText>
                    { getHelper() }
                </FormHelperText>
            }
        </FormControl>
    )
})

const CheckboxGroup = (
    props = {
        name: undefined,
        value: undefined,
        items: undefined,
        itemsCustom: undefined,
        title: undefined,
        labelPlacement: undefined,
        direction: undefined,
        checkboxIcon: undefined,
        checkedboxIcon: undefined,
        helperText: undefined,
        classes: undefined,
    }
) => <InputHookFormWrapper Element={CheckboxGroupComponent} {...props} />

CheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            value: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })
    ),
    itemsCustom: PropTypes.arrayOf(PropTypes.func),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    labelPlacement: PropTypes.string,
    direction: PropTypes.string,
    checkboxIcon: PropTypes.element,
    checkedboxIcon: PropTypes.element,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    classes: PropTypes.object,
}

export default memo(CheckboxGroup);
