import React from "react";

import { FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import clsx from "clsx";

const useStyle = makeStyles(() => ({
    controlLabel: {
        width: "fit-content",
        margin: 0,

        "& input": {
            zIndex: -10,
        },

        "& span.MuiRadio-root": {
            zIndex: 10,
            padding: 0,
        },
    }
}))

const StyledRadio = React.forwardRef(({
    label,
    labelPlacement,
    disabled,
    value,
    radioIcon,
    checkedRadioIcon,
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
            control={
                <Radio 
                    icon={radioIcon}
                    checkedIcon={checkedRadioIcon}
                    inputRef={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            }
        />
    )
})

export default StyledRadio;
