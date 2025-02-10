import { List, ListItem, ListItemText } from '@mui/material'
import { Grid } from '@mui/material';
import env from "react-dotenv";
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button } from 'react-bootstrap';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { saveAs } from "file-saver";
import { Document, ImageRun, Packer, Paragraph } from "docx";

interface ResultadosListProps {
    data: any
    enAccionEliminar: (item: any) => void
}

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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ResultadosList: React.FC<ResultadosListProps> = (props: ResultadosListProps) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const enAccionExportar = (data: any) => {
        const doc = new Document({
            sections: [
                {
                    children:  data?.tipo === 'IMAGEN' ? [
                        new Paragraph('Titulo: '+data?.titulo || ''),
                        new Paragraph('Fecha de registro: '+data?.fecha_registro || ''),
                        new Paragraph('Resumen: '+data?.resumen || ''),

                        props?.data?.usuario ? new Paragraph('Usuario: '+props?.data?.usuario || '') : new Paragraph(''),
                        props?.data?.obra ? new Paragraph('Obra: '+props?.data?.obra || '') : new Paragraph(''),
                        props?.data?.contrato ? new Paragraph('Contrato: '+props?.data?.contrato || '') : new Paragraph(''),
                        props?.data?.frente ? new Paragraph('Frente: '+props?.data?.frente || '') : new Paragraph(''),
                        
                        props?.data?.cantidad_visual ? new Paragraph('Avance cantidad visual: '+props?.data?.cantidad_visual || '') : new Paragraph(''),
                        props?.data?.cantidad_confirmada ? new Paragraph('Avance cantidad confirmada: '+props?.data?.cantidad_confirmada || '') : new Paragraph(''),
                        props?.data?.fecha_avance ? new Paragraph('Avance: Fecha avance '+props?.data?.fecha_avance || '') : new Paragraph(''),
                        props?.data?.fecha_confirmacion ? new Paragraph('Avance: Fecha confirmacion avance '+props?.data?.fecha_confirmacion || '') : new Paragraph(''),
                        props?.data?.id_estimacion ? new Paragraph('Avance: Id estimacion '+props?.data?.id_estimacion || '') : new Paragraph(''),
                        
                        
                        
                    


                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: Uint8Array.from(atob((data?.img || '').replaceAll('data:image/png;base64,','')), c =>
                                        c.charCodeAt(0)
                                    ),
                                    transformation: {
                                        width: 200,
                                        height: 100
                                    }
                                })
                            ]
                        })

                        
                    ] : [
                        new Paragraph('Titulo: '+data?.titulo || ''),
                        new Paragraph('Fecha de registro: '+data?.fecha_registro || ''),
                        new Paragraph('Texto original: '+data?.texto_original || ''),
                        new Paragraph('Resumen: '+data?.resumen || ''),
                        props?.data?.usuario ? new Paragraph('Usuario: '+props?.data?.usuario || '') : new Paragraph(''),
                        props?.data?.obra ? new Paragraph('Obra: '+props?.data?.obra || '') : new Paragraph(''),
                        props?.data?.contrato ? new Paragraph('Contrato: '+props?.data?.contrato || '') : new Paragraph(''),
                        props?.data?.frente ? new Paragraph('Frente: '+props?.data?.frente || '') : new Paragraph(''),
                        
                        props?.data?.cantidad_visual ? new Paragraph('Avance cantidad visual: '+props?.data?.cantidad_visual || '') : new Paragraph(''),
                        props?.data?.cantidad_confirmada ? new Paragraph('Avance cantidad confirmada: '+props?.data?.cantidad_confirmada || '') : new Paragraph(''),
                        props?.data?.fecha_avance ? new Paragraph('Avance: Fecha avance '+props?.data?.fecha_avance || '') : new Paragraph(''),
                        props?.data?.fecha_confirmacion ? new Paragraph('Avance: Fecha confirmacion avance '+props?.data?.fecha_confirmacion || '') : new Paragraph(''),
                        props?.data?.id_estimacion ? new Paragraph('Avance: Id estimacion '+props?.data?.id_estimacion || '') : new Paragraph(''),            
                    ]
                }
            ]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, data?.fecha_registro+".docx");
        });
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {props?.data?.tipo === 'IMAGEN' ?
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Resumen" {...a11yProps(0)} />
                        <Tab label="Imagen" {...a11yProps(1)} />
                        <Tab label={<DownloadForOfflineIcon color="action" />} {...a11yProps(2)} />
                        <Tab label={<DeleteTwoToneIcon color="error" />} {...a11yProps(3)} />
                        <Tab label={'Informacion detallada'} {...a11yProps(4)} />
                    </Tabs> :
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Texto original" {...a11yProps(0)} />
                        <Tab label="Resumen" {...a11yProps(1)} />
                        <Tab label="Audio" {...a11yProps(2)} />
                        <Tab label={<DownloadForOfflineIcon color="action" />} {...a11yProps(3)} />
                        <Tab label={<DeleteTwoToneIcon color="error" />} {...a11yProps(4)} />
                        <Tab label={'Informacion detallada'} {...a11yProps(5)} />
                    </Tabs>
                }
            </Box>
            {
                props?.data?.tipo === 'IMAGEN' ?
                    <>
                        <CustomTabPanel value={value} index={0}>
                            {props?.data?.resumen || ''}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1} >
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <img width={250} style={{ borderRadius: '5px' }} src={props?.data?.img} alt="..." />
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2} >
                            <Grid container spacing={2}>

                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="primary"
                                        onClick={(e: any) => {
                                            enAccionExportar(props?.data);
                                            
                                        }}
                                    >
                                        Exportar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3} >
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    <h4>¿Desea eliminar el registro?</h4>
                                </Grid>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="primary"
                                        onClick={(e: any) => {
                                            props?.enAccionEliminar(props?.data)
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={4} >
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'justify' }}>
                                    {props?.data?.titulo  ? <p>Titulo: {props?.data?.titulo}</p> : null}
                                    {props?.data?.usuario  ? <p>usuario: {props?.data?.usuario}</p> : null}
                                    {props?.data?.obra ? <p>obra: {props?.data?.obra}</p>:null}
                                    {props?.data?.contrato ? <p>contrato: {props?.data?.contrato}</p>:null}
                                    {props?.data?.frente ? <p>frente: {props?.data?.frente}</p>:null}
                                    {props?.data?.cantidad_visual ? <p>avance:  cantidad_visual {props?.data?.cantidad_visual} ,
                                    Cantidad visual {props?.data?.cantidad_visual} ,
                                    Cantidad confirmada {props?.data?.cantidad_confirmada} ,
                                    Fecha avance {props?.data?.fecha_avance} ,
                                    Fecha confirmacion avance {props?.data?.fecha_confirmacion} ,
                                    Id estimacion {props?.data?.id_estimacion} ,
                                         </p>:null}
                                </Grid>
                            </Grid>
                        </CustomTabPanel>


                    </> :
                    <>
                        <CustomTabPanel value={value} index={0}>
                            {props?.data?.texto_original || ''}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            {props?.data?.resumen || ''}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <audio controls src={`${env.API_URL_DOCUMENTOS}/storage/app/${props?.data?.ruta || ""}`}></audio>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3} >
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="primary"
                                        onClick={(e: any) => {
                                            enAccionExportar(props?.data)
                                        }}
                                    >
                                        Exportar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4} >
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    <h4>¿Desea eliminar el registro?</h4>
                                </Grid>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="primary"
                                        onClick={(e: any) => {
                                            props?.enAccionEliminar(props?.data)
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={5} >
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'justify' }}>
                                {props?.data?.titulo  ? <p>Titulo: {props?.data?.titulo}</p> : null}
                                    {props?.data?.usuario  ? <p>usuario: {props?.data?.usuario}</p> : null}
                                    {props?.data?.obra ? <p>obra: {props?.data?.obra}</p>:null}
                                    {props?.data?.contrato ? <p>contrato: {props?.data?.contrato}</p>:null}
                                    {props?.data?.frente ? <p>frente: {props?.data?.frente}</p>:null}
                                    {props?.data?.cantidad_visual ? <p>avance:  cantidad_visual {props?.data?.cantidad_visual} ,
                                    Cantidad visual {props?.data?.cantidad_visual} ,
                                    Cantidad confirmada {props?.data?.cantidad_confirmada} ,
                                    Fecha avance {props?.data?.fecha_avance} ,
                                    Fecha confirmacion avance {props?.data?.fecha_confirmacion} ,
                                    Id estimacion {props?.data?.id_estimacion} ,
                                         </p>:null}
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                    </>
            }
        </Box>
    );
}

export default ResultadosList
