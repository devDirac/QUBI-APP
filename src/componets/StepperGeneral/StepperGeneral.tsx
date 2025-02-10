import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { StepperGeneralProps } from './types';
import { Card, Grid } from '@mui/material';
import useStepperGeneral from './useStepperGeneral';
import './style.scss';
const StepperGeneral: React.FC<StepperGeneralProps> = (props: StepperGeneralProps) => {
    
    const {
        handleReset,
        handleBack,
        handleNext
    } = useStepperGeneral(props);

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={props?.activeStep} alternativeLabel>
                {props?.steps.map((label, index) => {
                    return (
                        <Step key={label?.name}>
                            <StepLabel >{label?.name}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {props?.activeStep === props?.steps.length ? (
                <React.Fragment>
                    <Typography style={{ ...{ textAlign: 'center', border: '2px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px' }, ...{ color: props?.darkMode ? '#FFF' : '' } }}>
                        {props?.textStepsCompleted}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Hecho</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Grid container style={props?.darkMode ? { backgroundColor: '#1f283e',borderLeft: '2px solid lightgrey',borderRight:'2px solid lightgrey',borderBottom:'0px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px' } : { backgroundColor: '#fff',borderLeft: '2px solid lightgrey',borderRight:'2px solid lightgrey',borderBottom:'0px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px' }} >
                        <Grid item xs={12} md={12}>
                            <Card>
                                {props?.children}
                            </Card>

                        </Grid>
                    </Grid>

                    <Box style={props?.darkMode ? { backgroundColor: '#1f283e'} : { backgroundColor: '#fff'}} sx={{ display: 'flex', flexDirection: 'row', pt: 2, borderLeft: '2px solid lightgrey',borderRight:'2px solid lightgrey',borderBottom:'2px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px' }}>
                        <Button
                            color="inherit"
                            disabled={props?.activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            style={props?.darkMode ? { color: '#fff'} : { }}
                        >
                            Atras
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} disabled={props?.isDisabledNext} style={props?.darkMode ? { color: '#fff'} : { }}>
                            {props?.activeStep === props?.steps.length - 1 ? 'Hecho' : 'Siguiente'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default StepperGeneral
