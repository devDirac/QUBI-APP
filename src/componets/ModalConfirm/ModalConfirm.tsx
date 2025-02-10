import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./style.scss";
import type { ModalConfirmProps } from './types';
import useModalConfirm from './useModalConfirm';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';

const ModalConfirm: React.FC<ModalConfirmProps> = (props: ModalConfirmProps) => {

    const {
        fullScreen,
        intl,
        darkMode,
        formik,
        comentarios,
        setComentarios
    } = useModalConfirm();

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
                    {props?.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props?.text}
                    </DialogContentText>
                    {
                        props?.esCambioEstatusEstimacion ?
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
                                        <FormikProvider value={formik}>
                                            <Form.Group className="mb-3 " >
                                                <InputField
                                                    required
                                                    value={comentarios || ''}
                                                    name="comentarios"
                                                    onInput={(e: any) => {
                                                        const target = e.target as HTMLTextAreaElement;
                                                        formik.setFieldValue("comentarios", target?.value || '');
                                                        setComentarios(target?.value);
                                                    }}
                                                    label={intl.formatMessage({ id: 'input_comentarios' })}
                                                    placeholder={intl.formatMessage({ id: 'input_comentarios_descripcion' })}
                                                    type="textArea"
                                                    id="comentarios"
                                                    formik={formik?.getFieldMeta('comentarios')}
                                                />
                                            </Form.Group>
                                        </FormikProvider>
                                    </Grid>
                                </Grid>
                            </Grid>
                            : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button color='error' autoFocus onClick={props?.onCancel} style={{ color: darkMode ? '#c14747' : '#c14747' }}>
                        {intl.formatMessage({ id: 'general_cancelar' })}
                    </Button>
                    <Button
                        disabled={props?.esCambioEstatusEstimacion && comentarios === ''}
                        onClick={() => {
                            props?.onAcept(comentarios)
                        }} autoFocus style={{ color: darkMode ? '#1A73E8' : '#1A73E8' }}>
                        {intl.formatMessage({ id: 'login_form_component_acceder' })}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalConfirm
