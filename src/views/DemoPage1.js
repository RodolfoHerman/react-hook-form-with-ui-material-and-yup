import React from "react";

import { Button, Grid, makeStyles } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import Person from "../assets/icons/Person";
import Input from "../shared/inputs/Input/Input";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import InputNumber from "../shared/inputs/InputNumber/InputNumber";
import RadioGroup from "../shared/inputs/RadioGroup/RadioGroup";
import { Checkbox, TextArea } from "../shared";


const tempoMesesErrorText = "Entre 2 e 24 meses";

const useStyle = makeStyles(() => ({
    input: {
        "& input": {
            color: "orange !important",
        },
    },
}));

const schema = yup.object().shape({
    nome: yup.string().nullable().required("Nome é obrigatório"),
    tempoMeses: yup.string()
        .nullable()
        .test(
            "is-meses",
            tempoMesesErrorText,
            (value) => {
                const number = parseFloat(value);

                return number >= 2 && number <= 24;
            }
        ).required(tempoMesesErrorText),
    sexo: yup.string().required("Sexo é obrigatório"),
    texto: yup.string().required("Texto é obrigatório"),
    termo: yup.boolean().nullable().oneOf([true], "Termo é obrigatório"),
});

const DemoPage1 = ({
    nextStep
}) => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const className = useStyle();

    const {
        handleSubmit,
        formState: { errors }
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
                                value="10564664642"
                            />
                        </Grid>
                        <Grid item>
                            <InputNumber 
                                name="tempoMeses"
                                label="Quantidade de meses"
                                mask="## meses"
                                placeholder="0 meses"
                                suffix=" meses"
                                helperText={!!errors.tempoMeses ? "" : tempoMesesErrorText}
                                fixedDecimalScale={false}
                                onlyNumber
                            />
                        </Grid>
                        <Grid item>
                            <RadioGroup 
                                name="sexo"
                                title="Qual sexo?"
                                options={[
                                    {
                                        label: "Masculino",
                                        value: "masculino"
                                    },
                                    {
                                        label: "Feminino",
                                        value: "feminino"
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item>
                            <TextArea 
                                name="texto"
                                label="Informe um breve texto"
                                minRows={2}
                                maxRows={4}
                            />
                        </Grid>
                        <Grid item>
                            <Checkbox
                                title="Aceite do termo"
                                name="termo"
                                label="Aceito o termo de compartilhamento de informações"
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
