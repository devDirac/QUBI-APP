import React from "react";
import type { SelectMultipleFieldProps } from "./types";
import Form from 'react-bootstrap/Form';
import useSelectMultipleField from "./useSelectMultipleField";
import "./style.scss";
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import _ from "lodash";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add';
import { Theme } from '@mui/material/styles';
import { Box, Chip, FormControl, Grid, MenuItem, OutlinedInput, Select } from "@mui/material";

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

const SelectMultipleField: React.FC<SelectMultipleFieldProps> = (props: SelectMultipleFieldProps) => {

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
    } = useSelectMultipleField(props);



    return (
        <div
            style={{ width: '100%' }}
            className={`${showFeedback ? isValid : ""}`}
        >
            <FormControl sx={{ width: '100%' }} style={{ width: '100%' }} variant="filled" size="small">
                {props?.label && <Form.Label style={darkMode ? { color: 'white', fontSize: 14 } : { fontSize: 14 }}>{props?.label}</Form.Label>}
                <InputGroup className="mb-3" style={esError ? { border: 'solid 1px red', borderRadius: '8px' } : formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ? { border: 'solid 1px #01db01', borderRadius: '8px' } : { borderRadius: '8px' }}>
                    <Grid container >
                        <Grid item xs={8} md={8}>
                            <Select
                                style={darkMode ? { border: 'none', backgroundColor: 'transparent', color: 'white', width: '100%', position: 'unset' } : { border: 'none', width: '100%', position: 'unset' }}
                                labelId="demo-multiple-chip-label"
                                multiple
                                displayEmpty
                                className="form-control"
                                onFocus={handleFocus}
                                {...newPros}
                                {...field}
                                onChange={(e) => {
                                    props?.onInput && props?.onInput(e);
                                }}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected: any) => {
                                    return (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, margin: '5px' }}>
                                            {(selected || []).map((value: any, key: number) => (
                                                <Chip key={key} label={props?.options.find((w: any) => w?.value === value)?.label} />
                                            ))}
                                        </Box>
                                    )
                                }}
                                MenuProps={MenuProps}
                            >
                                {props?.options.map((name: any) => (
                                    <MenuItem
                                        key={name?.value}
                                        value={name?.value}
                                        style={getStyles(name, props?.value || [], theme)}
                                    >
                                        {name?.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={4} md={4} style={{ borderRadius: '10px' }}>
                            <ButtonGroup style={{float:'right'}} >
                                {
                                    btnPlus ?
                                        <Button onClick={() => props?.onAdd && props?.onAdd()} variant="outline-secondary" style={{ border: '1px solid rgb(227 215 215)', width: '50%', height: '100%', float: 'right' }} id="button-addon1">
                                            <AddIcon color="info" />
                                        </Button> :
                                        null
                                }
                                {
                                    esError || (formik?.touched && !formik?.error && !_.isEmpty(formik?.value)) ?
                                        <Button variant="outline-secondary" style={{ border: '1px solid rgb(227 215 215)', float: 'right', width: props?.btnPlus ? '50%' : '100%', height: '100%' }} id="button-addon2">
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

export default SelectMultipleField;