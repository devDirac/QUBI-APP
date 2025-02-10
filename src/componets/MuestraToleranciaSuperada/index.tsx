import React from 'react'
import type { MuestraToleranciaSuperadaProps } from './types'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useIntl } from "react-intl";
import { useMaterialUIController } from "context";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./style.scss";
import { numericFormatter } from 'react-number-format';

const MuestraToleranciaSuperada: React.FC<MuestraToleranciaSuperadaProps> = (props: MuestraToleranciaSuperadaProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={props?.open}
                onClose={props?.onCancel}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        backgroundColor: darkMode ? "#3b435f" : 'white',
                        boxShadow: "none"
                    },
                }}
            >
                <DialogTitle id="responsive-dialog-title">

                </DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    <DialogContentText>
                        {`${intl.formatMessage({ id: 'muestra-tolerancia-superada-1' })}: ${numericFormatter(props?.importeCatalogo, { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} `}
                    </DialogContentText>
                    <DialogContentText>
                        {`${intl.formatMessage({ id: 'muestra-tolerancia-superada-2' })}: ${numericFormatter(props?.diferencia, { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}`}
                    </DialogContentText>
                    <DialogContentText>
                        {`${intl.formatMessage({ id: 'muestra-tolerancia-superada-3' })}: ${numericFormatter(props?.tolerancia, { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}`}
                    </DialogContentText>
                    <DialogContentText>
                        {`${intl.formatMessage({ id: 'muestra-tolerancia-superada-4' })}`}
                    </DialogContentText>
                    <hr></hr>
                    <DialogContentText>
                        {`${intl.formatMessage({ id: 'muestra-tolerancia-superada-5' })}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                    <Button variant='outlined' color='success' onClick={props?.onAcept} style={{ color: darkMode ? '#1A73E8' : '#1A73E8'}}>
                        {intl.formatMessage({ id: 'muestra-tolerancia-superada-aceptar' })}
                    </Button>
                    <Button variant='outlined' color='error' onClick={props?.onCancel} style={{ color: darkMode ? '#c14747' : '#c14747'}}>
                        {intl.formatMessage({ id: 'muestra-tolerancia-superada-cancelar' })}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MuestraToleranciaSuperada
