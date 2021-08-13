import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Person from "../assets/icons/Person";
import Input from "../shared/inputs/Input/Input";

const useStyle = makeStyles(() => ({
    input: {
        "& input": {
            color: "orange !important",
        },
    },
}))

const DemoPage1 = ({
    nextStep
}) => {
    const methods = useForm({
        mode: "onTouched",
    });
    const className = useStyle();

    const {
        handleSubmit,
    } = methods;

    const onSubmit = (data) => {
        console.log(data);

        nextStep();
    }

    return <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
            <Grid item>
                <FormProvider {...methods}>
                    <Grid container direction="column">
                        <Grid item>
                            <Input 
                                iconStart={<Person />}
                                classes={className}
                                label="Nome completo"
                                name="nome"
                            />
                        </Grid>
                        <Grid item>
                            <Input 
                                iconEnd={<Person />}
                                classes={className}
                                label="E-mail"
                                name="email"
                                maxLength={3}
                            />
                        </Grid>
                        <Grid item>
                            <Input 
                                label="CPF"
                                name="cpf"
                                type="tel"
                                mask="999.999.999-99"
                                onlyNumber
                                value="105.646.646-42"
                            />
                        </Grid>
                    </Grid>
                </FormProvider>
            </Grid>
            <Grid item>
                <Button
                    variant="contained" 
                    color="secondary"
                    type="submit"
                >
                    CONTINUAR
                </Button>
            </Grid>
        </Grid>
    </form>
}

export default DemoPage1;
