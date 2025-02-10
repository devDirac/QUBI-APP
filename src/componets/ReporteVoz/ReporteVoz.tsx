import React, { useRef, useState } from 'react'
import { ReporteVozProps } from './types'
import { Badge, Grid } from '@mui/material'
import { Button, ButtonGroup } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { getParameterValues } from '../../utils/index';
import ModalComponent from '../../componets/Modal';
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';
import { useSelector } from 'react-redux';
import TituloForm from './tituloForm';
import { useMaterialUIController } from 'context';

const ReporteVoz: React.FC<ReporteVozProps> = (props: ReporteVozProps) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [recordings, setRecordings] = useState<any>([]);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<any>(null);
    const audioChunksRef = useRef<any>([]);
    const audioContextRef = useRef<any>(null);
    const analyserRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);
    const [animationId, setAnimationId] = useState<any>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const [counter,setCounter] = useState(129);
    let myInterval:any = null;
    let mytimeoutID:any = null;

    const user: any = useSelector((state: any) => state?.app?.user?.data?.id || false);

    const startRecording = async () => {
        try {

            if (recordings?.length >= 9) {
                setMensajeAlert('Ha llegado al maximo de imagenes, procese las imagenes en lista o elimine alguna de ellas para poder tomar más fotografias');
                handleisAlertOpen();
                return;
            }

            /* let counter = 120; */
            myInterval = setInterval(() => {
                setCounter((c_)=> c_- 1)
            }, 1000);

            mytimeoutID = setTimeout(() => {
                stopRecording();
            }, 129000);

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.fftSize = 2048;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (event: any) => {
                audioChunksRef.current.push(event?.data); // Guarda los fragmentos de audio
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioURL = URL.createObjectURL(audioBlob);
                const grabaciones = Object.assign([], recordings);
                const nueva = { id: recordings?.length + 1, audio: { blob: audioBlob, url: audioURL } };
                grabaciones.push(nueva);
                setRecordings(grabaciones);
                audioChunksRef.current = [];
            };
            mediaRecorder.start();
            setIsRecording(true);
            visualize(analyser);
        } catch (err) {
            console.error('Error al iniciar la grabación de audio: ', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            cancelAnimationFrame(animationId);
            clearInterval(myInterval);
            clearTimeout(mytimeoutID);
            setCounter(129);
            if (audioContextRef.current) {
                if(audioContextRef.current?.state !== "closed"){
                    audioContextRef.current.close();
                }
            }
        }
    };

    const visualize:any = (analyser: any) => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const draw = () => {
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'black';
            canvasCtx.beginPath();
            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
            setAnimationId(requestAnimationFrame(draw));
        };
        draw();
    };

    const deleteRecording = (id: any) => {
        const grabaciones = Object.assign([], recordings);
        const remove = grabaciones.filter((data: any) => data?.id !== id);
        setRecordings(remove);
    };

    const sendRecording = (grabacion: any, id: any) => {
        cancelAnimationFrame(animationId);
        props?.envarVoz && props?.envarVoz(grabacion, user);
        const grabaciones = Object.assign([], recordings);
        const remove = grabaciones.filter((data: any) => data?.id !== id);
        setRecordings(remove);
    };

    const enviarTodas = () => {
        cancelAnimationFrame(animationId);
        props?.envarVoces && props?.envarVoces(recordings, user);
        setRecordings([])
    }

    const addTitulo = (titulo: any, id: any) => {
        const fotos = Object.assign([], recordings);
        setRecordings(fotos.map((fd: any) => {
            const titulo_ = fd?.id === id ? titulo : fd?.titulo
            return {
                ...fd,
                ...{
                    titulo: titulo_
                }
            }
        }));
    }

    return (
        <Grid container spacing={2}>
            <Grid item xl={12} style={{ marginBottom: 10 }}>
                <ButtonGroup>
                    <Button disabled={isRecording} variant="outline-primary" onClick={startRecording}>
                        <MicTwoToneIcon/> Iniciar Grabación
                    </Button>
                    {isRecording ? <Button variant="outline-danger" onClick={stopRecording}>
                        Detener Grabación
                    </Button> : null}
                    {recordings.length && recordings?.length > 1 ? <Button variant="outline-success" onClick={enviarTodas}>
                        Enviar todas las grabaciones
                    </Button> : null}
                </ButtonGroup>
            </Grid>
            {isRecording ? <Grid item xl={12}>
                <p>Restan:  {counter}  Segundos</p>
            </Grid> : null}
            {isRecording ? <Grid item xl={12} style={{textAlign:'center', fontWeight:'bold'}}>
                <p>Grabando</p>
            </Grid> : null}
            <Grid item xl={12}>
                <canvas ref={canvasRef} width="640" height="100" style={{ backgroundColor: '#fff', margin: '10px 0', width: isRecording ? '100%' : 0, height: isRecording ? '80px' : 0 }}></canvas>
            </Grid>
            <Grid item xl={12}>
                <Grid container spacing={2}>
                    {recordings.length === 0 ? null : (
                        recordings.map((recording: any) => (
                            <Grid item xs={12} md={3} key={recording?.id} style={{ border: 'solid 1px #f0f2f5', borderRadius: 10 }}>
                                <Grid container spacing={2}>
                                    <Grid item xl={12}>
                                        <Badge badgeContent={recording?.id} color="info">
                                            <audio controls src={recording?.audio?.url}></audio>
                                        </Badge>
                                    </Grid>
                                    <TituloForm darkMode={darkMode} enAccion={(parametro: string) => addTitulo(parametro, recording?.id)}/>
                                    <Grid item xl={12}>
                                        <ButtonGroup>
                                            <Button variant="outline-danger" onClick={() => deleteRecording(recording?.id)}><DeleteIcon />Eliminar</Button>
                                            <Button variant="outline-primary" onClick={() => sendRecording(recording, recording?.id)}> <SendIcon />Enviar </Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
        </Grid>
    )
}

export default ReporteVoz
