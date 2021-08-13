import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import StyledInput from './StyledInput';


const getErros = (name, formContext) => {
    const erros = [];

    if (!name) {
        erros.push("-> É necessário informar a prop 'name' do input");
    }

    if (!formContext) {
        erros.push("-> É necessário que o input esteja encapsulado no 'FormProvider'");
    }

    if (formContext) {
        const { formState } = formContext;

        if (!formState) {
            erros.push("-> É necessário colocar a prop '{...methods}' no 'FormProvider'");
        }
    }

    return erros;
}

const InputHookFormWrapper = (props) => {
    const formContext = useFormContext();
    const arrayErrors = getErros(props.name, formContext);

    if (!!arrayErrors.length) {
        return <StyledInput 
            error 
            multiline 
            minRows={3} 
            maxRows={5} 
            label="Error"
            helperText="Necessário informar props" 
            readOnly
            value={arrayErrors.join("\n")} 
            classes={{}}
        />
    }

    const { Element, ...newProps } = props;
    const { control, formState: { errors } } = formContext;

    return (
        <Controller 
            name={props.name}
            control={control}
            defaultValue={props.value}
            render={({ field: { onChange, onBlur, value, name, ref } }) => {
                return <Element 
                    {...newProps}
                    inputRef={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    errors={errors}
                />
            }}
        />
    )
}

export default InputHookFormWrapper;
