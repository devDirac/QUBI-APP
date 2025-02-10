import React, { useState } from 'react'
import StepperGeneral from '../StepperGeneral/StepperGeneral';
import { useMaterialUIController } from 'context';
import { useIntl } from 'react-intl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import UsuarioExistenteGeoForm from './UsuarioExistenteGeoForm';
import { getErrorHttpMessage } from '../../utils/index';
import SeleccionTipoAltaUsuario from './SeleccionTipoAltaUsuario';
import UsuarioGeocercaAdd from './UsuarioGeocercaAdd';
import DinamicTableMejorada from '../DinamicTableMejorada/DinamicTableMejorada';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface AddUsuariosGeocercaProps {
    contratos: any[]
    usuarios: any[]
    procesando: boolean
    getUsuariosContrato: (data: any) => void
    guardaUsuariosExistentes: (data: any) => void
    guardaUsuariosInExistentes: (data: any) => void
    usuariosGeocercas: any[]
    deleteUsuarios: (data: any) => void
}
const AddUsuariosGeocerca: React.FC<AddUsuariosGeocercaProps> = (props: AddUsuariosGeocercaProps) => {
    const intl = useIntl();
    const [isDisabledNext, setIsDisabledNext] = useState<boolean>(true);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [activeStep, setActiveStep] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [eventos, setEventos] = useState<any[]>([]);
    const [item, setItem] = useState(null);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [steps, setSteps] = useState<any[]>([
        { name: intl.formatMessage({ id: 'stepper_geocercas_usuarios_paso_0' }), step: 0 },
        { name: intl.formatMessage({ id: 'stepper_geocercas_usuarios_paso_1' }), step: 1 },
        { name: intl.formatMessage({ id: 'stepper_geocercas_usuarios_paso_2' }), step: 2 }
    ])

    const setStepRegistro = (step: number) => {
        if (activeStep === 2 && step === 1) {
            setActiveStep(0);
            setIsDisabledNext(true);
            return;
        }
        setActiveStep(step);
        setIsDisabledNext(true);
    }


    const deletePregunta = (data: any) => {
        setItem(data);
        setOpenModalConfirm(true);

    }



    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Usuarios exsitentes en el sistema" {...a11yProps(0)} />
                        <Tab label="Alta de usuarios" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {props?.usuariosGeocercas?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            esUsuariosGeocerca
                            actions
                            flex
                            enAccion={(accion, data) => {
                                if (accion === 'eliminar') {
                                    deletePregunta(data)
                                }
                            }}
                            key={'reclasificaciones'}
                            data={props?.usuariosGeocercas}
                        />
                    </Grid> : 'Sin registros'}

                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} xl={12}>
                            <StepperGeneral
                                isDisabledNext={isDisabledNext}
                                darkMode={darkMode}
                                textStepsCompleted={intl.formatMessage({ id: 'alta_usuarios_geocerca_confirmacion' })}
                                activeStep={activeStep}
                                onStep={setStepRegistro}
                                steps={steps}
                            >
                                {
                                    activeStep === 0 ? <SeleccionTipoAltaUsuario
                                        onSeleccion={(opcion) => {
                                            setStepRegistro(opcion)
                                        }} /> : null
                                }
                                {
                                    activeStep === 1 ? <UsuarioGeocercaAdd
                                        contrato={props?.contratos}
                                        action={(data: any) => {
                                            props?.guardaUsuariosInExistentes(data);
                                            setStepRegistro(3)
                                        }}
                                        procesando={props?.procesando}
                                        resetForm={false}
                                        onReset={() => console.log()}
                                    /> : null
                                }
                                {
                                    activeStep === 2 ? <UsuarioExistenteGeoForm
                                        contrato={props?.contratos}
                                        onContrato={(data) => props?.getUsuariosContrato(data)}
                                        usuarios={props?.usuarios}
                                        proyecto={'Poyecto'}
                                        procesando={props?.procesando}
                                        onAccion={(data) => {
                                            props?.guardaUsuariosExistentes(data);
                                            setStepRegistro(3);
                                        }}
                                    /> : null
                                }
                            </StepperGeneral>

                        </Grid>
                    </Grid>
                </CustomTabPanel>
            </Box>
            <ModalConfirm onAcept={() => {
                props?.deleteUsuarios(item);
                setOpenModalConfirm(false);
            }} onCancel={() => {
                setOpenModalConfirm(false);
            }} open={openModalConfirm} text={'¿Desea eliminar el usuario seleccionado, tome en cuenta que se perderan todos sus registros?'} title={''} />

        </div>
    )
}

export default AddUsuariosGeocerca;