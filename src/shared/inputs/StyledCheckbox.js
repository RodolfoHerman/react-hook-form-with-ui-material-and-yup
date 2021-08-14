import React from "react";

import { FormControlLabel, makeStyles, Checkbox } from '@material-ui/core';
import clsx from "clsx";

const useStyle = makeStyles(() => ({
    controlLabel: {
        width: "fit-content",
        margin: 0,

        "& input": {
            zIndex: -10,
        },

        "& span.MuiCheckbox-root": {
            zIndex: 10,
            padding: 0,
        },
    }
}))

const StyledCheckbox = React.forwardRef(({
    label,
    labelPlacement,
    disabled,
    checked,
    value,
    checkboxIcon,
    checkedboxIcon,
    onChange,
    onBlur,
    inputKey,
    classes = {},
}, ref) => {
    const className = useStyle();

    return (
        <FormControlLabel 
            key={inputKey}
            label={label}
            labelPlacement={labelPlacement}
            className={clsx(className.controlLabel, classes.controlLabel)}
            disabled={disabled}
            value={value}
            checked={checked}
            control={
                <Checkbox 
                    icon={checkboxIcon}
                    checkedIcon={checkedboxIcon}
                    inputRef={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            }
        />
    )
})

export default StyledCheckbox;
