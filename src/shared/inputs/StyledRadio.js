import React from "react";

import { FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import clsx from "clsx";
import RadioIcon from "../../assets/icons/RadioIcon";
import CheckedRadioIcon from "../../assets/icons/CheckedRadioIcon";

const useStyle = makeStyles(() => ({
    controlLabel: {
        width: "fit-content",
        margin: 0,

        "& input": {
            zIndex: -10,
        },

        "& span.MuiRadio-root": {
            zIndex: 10,
            padding: "0px 5px",
        },
    }
}))

const StyledRadio = React.forwardRef(({
    label,
    labelPlacement,
    disabled,
    value,
    radioIcon = <RadioIcon />,
    checkedRadioIcon= <CheckedRadioIcon />,
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
