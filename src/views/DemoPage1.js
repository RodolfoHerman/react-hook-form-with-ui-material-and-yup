import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Person from "../assets/icons/Person";
import StyledInput from "../shared/inputs/StyledInput";

const useStyle = makeStyles(() => ({
    inputNome: {
        "& input": {
            color: "orange !important",
        },
    },

}))

const DemoPage1 = ({
    nextStep
}) => {
    const className = useStyle();

    return <form noValidate autoComplete="off">
        <Grid container>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <StyledInput 
                            startIcon={<Person />}
                            classes={className.inputNome}
                            type="text"
                            label="Nome completo"
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                            type="email"
                            label="E-mail"
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                            type="text"
                            label="CPF"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    onClick={nextStep}
                    variant="contained" 
                    color="secondary"
                >
                    CONTINUAR
                </Button>
            </Grid>
        </Grid>
    </form>
}

export default DemoPage1;
