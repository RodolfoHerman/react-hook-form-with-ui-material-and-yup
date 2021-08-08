import React from "react";

import { makeStyles } from "@material-ui/core";


const useStyle = makeStyles(() => ({
    ContainerPrincipal: {
        width: "100%",
        height: 18,
        backgroundColor: "#FFF",

        display: "flex",
        alignItems: "center",

        "& div.progress-wrapper": {
            zIndex: 3,
            width: "100%",
            height: 5,
            backgroundColor: "#CCC",

            display: "flex",
            alignItems: "center",

            "& div.progress": {
                height: 5,
                zIndex: 5,
                backgroundColor: "orange",
                transition: "width 1s cubic-bezier(0.23, 1, 0.32, 1) 0s",
            }
        }
    },
}));

const StepperProgress = ({
    numberOfSteps,
    currentStep,
}) => {
    const classes = useStyle();

    const progressPerStep = 100 / numberOfSteps;
    const progress = currentStep * progressPerStep;

    return <div className={classes.ContainerPrincipal}>
        <div className="progress-wrapper">
            <div className="progress" style={{ width: `${progress}%` }} />
        </div>
    </div>
}

export default StepperProgress;
