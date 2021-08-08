import React, { useEffect, useState } from 'react';

import { Container, makeStyles, Typography } from '@material-ui/core';
import StepperProgress from './StepperProgress/StepperProgress';
import { useHistory, useLocation } from "react-router-dom";
import { parse } from "query-string";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";


const useStyle = props => makeStyles((theme) => ({
    ContainerPrincipal: {
        [theme.breakpoints.down('sm')]: {
            padding: "0px 5px",
        },
    },

    ContainerProgressBar: {
        display: props.isShowProgress ? "block" : "none",
        width: "100%",
        marginBottom: 10,
    },

    // Titles
    TypographyTitles: {
        lineHeight: "25px",
        color: "#161616",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "20px",
    },

    // Subtitles
    TypographySubTitles: {
        lineHeight: "17px",
        color: "#161616",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
    },

    // Steps
    TypographySteps: {
        lineHeight: "17px",
        color: "#CCCCCC",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
    },


    // CONTENT

    ContainerContent: {
        width: "100%",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    // LEFT CONTENT

    ContainerLeft: {
        height: "70vh",
        width: "45%",

        display: props.isShowImage ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "space-between",

        "& .left-image": {
            width: "100%",
            height: "70%",

            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },

        "& .left-titles": {
            width: "100%",
            height: "20%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },

        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
    },

    // RIGHT CONTENT

    ContainerRight: {
        width: props.isShowImage ? "50%" : "100%",
        minHeight: props.isShowImage ? "70vh" : "unset",
        overflow: "hidden",

        display: "flex",
        flexDirection: "column",

        "& .transition-group": {
            height: "100%",
            display: "flex",
        },

        "& .right-steps": {
            display: props.isShowProgress ? "block" : "none",
            marginBottom: "10px",
        },

        "& .right-content": {
            height: "100%",
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",

            "& .right-titles": {
                display: "flex",
                flexDirection: "column",

                "& > * ": {
                    margin: "0px 0px 10px 0px",
                }
            },

            "& .right-content-show": {
                height: "100%",
                width: "100%",

                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",

                "& > * ": {
                    height: "100%",
                    width: "100%",
                    marginTop: 20,

                    "& > * ": {
                        height: "100%",
                        width: "100%",

                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                    },

                    "& button": {
                        marginTop: 10,
                    }

                },
            },
        },

        [theme.breakpoints.down('sm')]: {
            width: "100%",
            minHeight: "unset !important",

            "& > * ": {
                height: "unset !important",
                minHeight: "unset !important",
            },
        },

        "& .slide-enter": {
            transform: `translateX(${props.translate}%)`,
        },

        "& .slide-enter-active": {
            transform: "translateX(0%)",
            transition: "transform 1000ms ease-in-out",
        },

        "& .slide-exit": {
            display: "none",
        },

        "& .slide-exit-active": {
            display: "none",
        },
    }
}));

const getProgressTitle = (currentStep, length, progressTitle) => {
    return `Step ${currentStep} of ${length} ${!!progressTitle ? " - ".concat(progressTitle) : ""}`;
}

const Stepper = ({
    imageToShow,
    title,
    subTitle,
    progressTitle,
    isShowProgress = true,
    containerMaxWidth = "lg",
    steps = [],
}) => {
    const location = useLocation();
    const history = useHistory();
    const currentStep = parseInt(parse(location.search).step) || 1;
    const [indexStep, setIndexStep] = useState(currentStep);
    const [principalTitle, setPrincipalTitle] = useState("");
    const [principalSubTitle, setPrincipalSubTitle] = useState("");
    const step = steps[currentStep - 1];
    const [isForward, setIsForward] = useState(true);
    const translate = isForward ? 100 : -100;
    const isShowImage = !!imageToShow;
    const classes = useStyle({ translate, isShowImage, isShowProgress })();

    useEffect(() => {
        if(currentStep >= indexStep) {
            setIsForward(true);
            setIndexStep(indexStep + 1);
        } else {
            setIsForward(false);
            setIndexStep(indexStep - 1);
        }

        setPrincipalTitle(step.title || title);
        setPrincipalSubTitle(step.subTitle || subTitle);
        window.scroll(0,0);

    }, [currentStep]);

    const nextStep = () => {
        const next = currentStep + 1;

        if(next <= steps.length) {
            history.push({
                pathname: location.pathname,
                search: `?step=${next}`,
            })
        }
    }

    const previousStep = () => {
        const previous = currentStep - 1;

        if(previous >= 1) {
            history.push({
                pathname: location.pathname,
                search: previous !== 1 ? `?step=${previous}` : "",
            })
        }
    }

    return <Container maxWidth={containerMaxWidth} disableGutters={!!containerMaxWidth} className={classes.ContainerPrincipal}>
        <div className={classes.ContainerProgressBar}>
            <StepperProgress currentStep={currentStep} numberOfSteps={steps.length} />
        </div>
        <div className={classes.ContainerContent}>
            <div className={classes.ContainerLeft}>
                <div style={{backgroundImage: `url("${imageToShow}")`}} className="left-image"></div>
                <div className="left-titles">
                    <Typography
                        className={classes.TypographyTitles}
                        variant="h1"
                    >
                        { principalTitle }
                    </Typography>
                    <Typography
                        className={classes.TypographySubTitles}
                        variant="subtitle1"
                    >
                        { principalSubTitle }
                    </Typography>
                </div>
            </div>
            <div className={classes.ContainerRight}>
                <div className="right-steps">
                    <Typography
                        className={classes.TypographySteps}
                        variant="subtitle2"
                    >
                        { getProgressTitle(currentStep, steps.length, progressTitle) }
                    </Typography>
                </div>
                <TransitionGroup
                    component="div"
                    className="transition-group"
                >
                    <CSSTransition
                        key={currentStep}
                        timeout={{ enter: 2000, exit: 1000 }}
                        classNames="slide"
                        mountOnEnter={false}
                        unmountOnExit={true}
                    >
                        <section className="right-content">
                            <div className="right-titles">
                                <Typography
                                    className={classes.TypographyTitles}
                                    variant="h2"
                                >
                                    { step.header }
                                </Typography>
                                <Typography
                                    className={classes.TypographySubTitles}
                                    variant="h2"
                                >
                                    { step.subHeader }
                                </Typography>
                            </div>
                            <div className="right-content-show">
                                <step.element 
                                    nextStep={nextStep}
                                    previousStep={previousStep}
                                    currentStep={currentStep}
                                    {...step}
                                />
                            </div>
                        </section>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    </Container>
}

Stepper.propTypes = {
    imageToShow: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    progressTitle: PropTypes.string,
    isShowProgress: PropTypes.bool,
    containerMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            subHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            element: PropTypes.func.isRequired,
        })
    ),
}

export default Stepper;
