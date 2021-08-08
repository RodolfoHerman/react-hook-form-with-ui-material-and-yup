import React from 'react';

import { InputAdornment, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';


const useStyle = makeStyles(() => ({
    root: {
        marginBottom: 10,

        "& .MuiFilledInput-root": {
            marginTop: 10,
            borderRadius: 8,
        },
        
        "& .MuiInputLabel-shrink": {
            transform: "translate(6px, -6px) scale(0.75)",
        },

        "& label.Mui-focused": {
            color: "rgba(0, 0, 0, 0.54) !important",
        },

        "& input": {
            padding: "6px 10px",
        },

        "& .MuiInputAdornment-positionStart": {
            margin: "0px !important",
        }
    }
}))

const StyledInput = (props) => {
    const className = useStyle();

    const {
        classes,
        minRows,
        maxRows,
        startIcon,
        endIcon,
        ...newProps
    } = props;

    return <TextField 
        classes={{
            root: clsx(className.root, classes)
        }}
        { ...newProps }
        InputLabelProps={{
            disableAnimation: true,
            shrink: true,
            variant: "outlined",
        }}
        InputProps={{
            disableUnderline: true,
            minRows: minRows,
            maxRows: maxRows,
            endAdornment: (
                endIcon && <InputAdornment position="end">
                    { endIcon }
                </InputAdornment>
            ),
            startAdornment: (
                startIcon && <InputAdornment position="start">
                    { startIcon }
                </InputAdornment>
            )
        }}
        variant="filled"
        fullWidth
    />
}

export default StyledInput;
