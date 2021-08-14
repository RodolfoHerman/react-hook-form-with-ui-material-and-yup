import React from 'react';

import { InputAdornment, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';


const useStyle = makeStyles(() => ({
    input: {
        marginBottom: 15,

        "& .MuiFilledInput-root": {
            marginTop: 10,
            borderRadius: 8,
        },
        
        "& .MuiInputLabel-shrink": {
            transform: "translate(6px, -6px) scale(0.75)",
        },

        "& label.Mui-focused": {
            color: "rgba(0, 0, 0, 0.54) !important",
            fontWeight: 800,
        },

        "& label.MuiInputLabel-root": {
            fontWeight: 800,
        },

        "& input": {
            padding: "6px 10px",
        },

        "& .MuiInputAdornment-positionStart": {
            margin: "0px !important",
        },

        "& p.MuiFormHelperText-contained": {
            marginLeft: 6,
        },
    }
}))

const StyledInput = (props) => {
    const className = useStyle();

    const {
        inputRef,
        classes,
        maxRows,
        minRows,
        iconStart,
        iconEnd,
        disabled,
        maxLength,
        readOnly,
        ...newProps
    } = props;

    return <TextField 
        className={clsx(className.input, classes.input)}
        { ...newProps }
        InputLabelProps={{
            disableAnimation: true,
            shrink: true,
            variant: "outlined",
        }}
        inputProps={{
            maxLength: maxLength,
        }}
        InputProps={{
            disableUnderline: true,
            minRows: minRows,
            maxRows: maxRows,
            disabled: disabled,
            readOnly: readOnly,
            endAdornment: (
                iconEnd && <InputAdornment position="end">
                    { iconEnd }
                </InputAdornment>
            ),
            startAdornment: (
                iconStart && <InputAdornment position="start">
                    { iconStart }
                </InputAdornment>
            )
        }}
        variant="filled"
        fullWidth
        inputRef={inputRef}
    />
}

export default StyledInput;
