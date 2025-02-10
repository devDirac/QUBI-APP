import React from "react";
import type { SelectMultipleAutoCompleteFieldProps } from "./types";
import Form from 'react-bootstrap/Form';

import "./style.scss";
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import _ from "lodash";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add';
import { Theme } from '@mui/material/styles';
import { Box, Chip, FormControl, Grid, MenuItem, OutlinedInput, /* Select */ } from "@mui/material";
import useSelectMultipleAutoCompleteField from './useSelectMultipleAutoCompleteField'
import Select, { MultiValue, components, GroupBase } from 'react-select';
import makeAnimated from 'react-select/animated';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: any, personName: readonly any[], theme: Theme) {
    return {
        fontWeight:
            personName.find((a) => a?.value === name?.value)
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const animatedComponents = makeAnimated();

const SelectMultipleAutoCompleteField: React.FC<SelectMultipleAutoCompleteFieldProps> = (props: SelectMultipleAutoCompleteFieldProps) => {

    const {
        showFeedback,
        isValid,
        handleFocus,
        field,
        errorMessage,
        formik,
        darkMode,
        esError,
        btnPlus,
        newPros,
        theme
    } = useSelectMultipleAutoCompleteField(props);

    const MAX_VISIBLE = 2;
    const MultiValueContainer = (props: any) => {
        const { selectProps, children, data } = props;
        const selectedOptions: MultiValue<any> = selectProps.value;
        const index = selectedOptions.findIndex((option) => option.value === data.value);
        if (index < MAX_VISIBLE) {
            return <components.MultiValueContainer {...props}>{children}</components.MultiValueContainer>;
        }
        return null;
    };

    const CustomMultiValue = (props: any) => {
        const { selectProps, index } = props;
        const selectedOptions: MultiValue<any> = selectProps.value;
        if (index < MAX_VISIBLE) {
            return <components.MultiValue {...props} />;
        }
        if (index === MAX_VISIBLE) {
            return (
                <div style={{ padding: '2px 8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginLeft: '4px' }}>
                    +{selectedOptions.length - MAX_VISIBLE} más
                </div>
            );
        }

        return null;
    };


    return (
        <div
            style={{ width: '100%' }}
            className={`${showFeedback ? isValid : ""}`}
        >
            <FormControl sx={{ width: '100%' }} style={{ width: '100%' }} variant="filled" size="small">
                {props?.label && <Form.Label style={darkMode ? { color: 'white', fontSize: 14 } : { fontSize: 14 }}>{props?.label}</Form.Label>}
                <InputGroup className="mb-3" style={esError ? { border: 'solid 1px red', borderRadius: '8px', width: '100%' } : formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ? { border: 'solid 1px #01db01', borderRadius: '8px', width: '100%' } : { borderRadius: '8px', width: '100%' }}>
                    <Grid container  >
                        <Grid item xs={10} md={10} >
                            <Select<any, true, GroupBase<any>>
                                onFocus={handleFocus}
                                className="form-control"
                                closeMenuOnSelect={false}
                                formatGroupLabel={(data) => `${data.label} (${data.options.length})`}
                                isMulti
                                {...newPros}
                                {...field}
                                components={{
                                    MultiValueContainer,
                                    MultiValue: CustomMultiValue,
                                }}
                                onChange={(e) => {
                                    props?.onInput && props?.onInput(e);
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} md={2} style={{ borderRadius: '10px' }}>
                            <ButtonGroup style={{ float: 'right' }} >
                                {
                                    btnPlus ?
                                        <Button onClick={() => props?.onAdd && props?.onAdd()} variant="outline-secondary" style={{ border: '1px solid #fff', position: 'relative', top: 8, width: '50%', height: '100%', float: 'right' }} id="button-addon1">
                                            <AddIcon color="info" />
                                        </Button> :
                                        null
                                }
                                {
                                    esError || (formik?.touched && !formik?.error && !_.isEmpty(formik?.value)) ?
                                        <Button variant="outline-secondary" style={{ border: '1px solid #fff', position: 'relative', top: 8, float: 'right', width: props?.btnPlus ? '50%' : '100%', height: '100%' }} id="button-addon2">
                                            {
                                                esError ?
                                                    <ErrorOutlineIcon color="error" /> :
                                                    formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ?
                                                        <CheckIcon color="success" /> :
                                                        <CheckIcon style={{ color: 'transparent' }} />
                                            }
                                        </Button> :
                                        null
                                }
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </InputGroup>
            </FormControl>
            <div className="flex items-center space-between">
                {showFeedback ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm"
                        style={{ textAlign: "left", paddingLeft: "5px", color: "red", fontWeight: 'normal', fontSize: '12px' }}
                    >
                        {errorMessage}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SelectMultipleAutoCompleteField;