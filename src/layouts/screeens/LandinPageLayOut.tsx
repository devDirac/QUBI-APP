import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Container,
  Chip
} from "@mui/material";
import {
  motion
} from "framer-motion";
import {
  useInView
} from "react-intersection-observer";
import { useNavigate } from 'react-router-dom';
import Header from '../../componets/Header/Header';
import WhatsAppContactoForm from '../../componets/WhatsAppContactoForm/WhatsAppContactoForm';
import { getErrorHttpMessage } from '../../utils';
import Marquee from 'react-fast-marquee';
import servicios1 from "assets/servicios/apm.png";
import servicios2 from "assets/servicios/arjion_b.png";
import servicios3 from "assets/servicios/metropoli.png";
import servicios4 from "assets/servicios/qubi.png";
import servicios5 from "assets/servicios/juno.png";
import MDBox from '../../componets/MDBox';
import MoisaicoImagen from '../../componets/MoisaicoImagen/MoisaicoImagen';


interface SectionProps {
  title: string;
  child: any
}

const LandinPageLayOut: React.FC = () => {
  const [seccion, setSeccion] = useState(0);
  const navigate = useNavigate();

  const [procesando, setProcesando] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const handleisAlertOpen = () => setIsAlert(true);
  const handleisAlertClose = () => setIsAlert(false);
  const [mensajeAlert, setMensajeAlert] = useState('');

  const Section: React.FC<SectionProps> = ({ title, child }) => {

    const {
      ref,
      inView
    } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        style={{ height: '100vh', backgroundColor: title === 'Nosotros' ? 'rgba(59, 130, 246, 0.8)' : title === 'Servicios' ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.6)' }}
      >
        <Box sx={{ py: 10, textAlign: "center" }} >
          <div className="text-container3">
            <h1 style={{ fontWeight: 'bolder' }}>{title}</h1>
          </div>
        </Box>
        <Box sx={{ textAlign: "center" }} >
          {child}
        </Box>
      </motion.div>
    );
  };

  const handleContacto = async (data: any) => {
    try {
      handleisAlertClose();
      setProcesando(true);
      //await contactoHttp(data);
      console.log('data', data)
      setProcesando(false);
      setMensajeAlert('Exito al contactar, en breve un asistente de QUBI se pondra en contacto con usted');
      handleisAlertOpen();

    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || 'Error');
      handleisAlertClose();
      handleisAlertOpen()

    }
  }

  const news = [{
    texto: 'Servicio APM',
    imagen: servicios1
  }, {
    texto: 'Servicio Arjion',
    imagen: servicios2
  }, {
    texto: 'Servicio Metropoli',
    imagen: servicios3
  }, {
    texto: 'Servicio QUBI',
    imagen: servicios4
  }, {
    texto: 'Servicio JUNO',
    imagen: servicios5
  },
  ]

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Navbar */}
      <Header />
      {/* Main Content */}
      <Container component="main" sx={{ flexGrow: 1, textAlign: "center", py: 4 }} style={{ height: '95vh' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" gutterBottom>
            Bienvenido a nuestra plataforma
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Descubre lo que tenemos para ti
          </Typography>
        </motion.div>
        {/* Features Section */}
        <Grid container spacing={3} mt={4}>
          {["Rápido", "Seguro", "Escalable"].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index} >
              <motion.div key={index} whileHover={{ scale: 1.05 }} onMouseOut={() => {
                setSeccion(0)
              }} onMouseOver={() => {
                setSeccion(index + 1)
              }}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{feature}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Característica destacada
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
          <Grid container style={{ height: 300 }}>
            {seccion === 1 ? <Grid item xs={12} style={{ height: 300 }}>
              <Grid container >
                <Grid item xs={12} style={{ height: 400, textAlign: 'center', marginTop: 150 }}>
                  <Typography variant="h4" gutterBottom>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                  </Typography>
                </Grid>
              </Grid>
            </Grid> : null}
            {seccion === 2 ? <Grid item xs={12} style={{ height: 300 }}>
              <Grid container >
                <Grid item xs={12} style={{ height: 400, textAlign: 'center', marginTop: 150 }}>
                  <Typography variant="h4" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra consequat vestibulum. Aenean vitae congue ante. Sed ac orci vehicula dui feugiat malesuada vitae quis enim.
                  </Typography>
                </Grid>
              </Grid>
            </Grid> : null}
            {seccion === 3 ? <Grid item xs={12} style={{ height: 300 }}>
              <Grid container >
                <Grid item xs={12} style={{ height: 400, textAlign: 'center', marginTop: 150 }}>
                  <Typography variant="h4" gutterBottom>
                    Fusce fermentum odio lectus, vel euismod magna iaculis vel. Pellentesque aliquam libero ut nisl varius sollicitudin. Integer tristique vehicula suscipit.
                  </Typography>
                </Grid>
              </Grid>
            </Grid> : null}
          </Grid>

        </Grid>
      </Container>
      <Grid container sx={{ flexGrow: 1, textAlign: "center" }} justifyContent={'center'} alignContent={'center'}>
        <Grid item xs={12} id="Bienvenido">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1 , y:  0}}
            transition={{ duration: 0.8 }}
            style={{ height: '100vh'   }}
          >
            <MoisaicoImagen />
          </motion.div>


        </Grid>
        <Grid item xs={12} id="Servicios">
          <Section
            title="Servicios"

            child={

              <Grid container >
                <Grid item xs={12} style={{ padding: 12 }}>
                  <Grid container spacing={2}>

                    <Grid item lg={6} md={6} sm={12} xl={6} xs={12} style={{ textAlign: 'justify' }}>
                      <p>Estos son algunos de nuestros productos y servicios<br /> sin embargo en QUBI nos encantaria poder llevar tu idea a la realidad.</p>
                      <p>Contacta con nosotros para ayudarte en tu proceso de desarrollo</p>
                    </Grid>
                    <Grid item lg={5} md={5} sm={12} xl={5} xs={12}>
                      {news?.length ? <Marquee speed={100}>
                        {
                          news?.map((r: any, key: any) => {
                            return (
                              <Grid item xs={4} style={{ margin: 10 }} key={key}>
                                <img width={200} height={120} src={r?.imagen} alt="profile-image" style={{ borderRadius: '5px', cursor: 'pointer' }} onClick={() => {
                                  if (r?.texto === 'Servicio JUNO') {
                                    navigate('/login-juno')
                                  }
                                }} />
                              </Grid>
                            )
                          })
                        }
                      </Marquee> : null}
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>



            }
          />
        </Grid>
        <Grid item xs={12} id="Contacto">
          <Section
            title="Contacto"
            child={
              <Grid container >
                <Grid item xs={12} style={{ padding: 12 }}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xl={6} xs={12} style={{ textAlign: 'justify' }}>
                      <p>Apreciamos tu interés por nuestros productos y servicios esperamos tener la oportunidad de realizar una presentación detallada de nuestros multiples plataformas.</p>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xl={6} xs={12}><WhatsAppContactoForm esContacto procesando={false} enAccion={(data) => { handleContacto(data) }} /></Grid>
                  </Grid>
                </Grid>

              </Grid>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}
export default LandinPageLayOut;