import { Avatar, Grid } from '@mui/material'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import DrawIcon from '@mui/icons-material/Draw';
import SetFirmaForm from './SetFirmaForm';


interface Item {
  clave: string
  fecha_registro: string
  firma_txt: string
  id: number
  id_usuario: number
  imagen: string
}

interface EditFirmaProps {
  item: Item
  darkMode: boolean
  procesando: boolean
  enAccion: (data: any) => void
}

const EditFirma: React.FC<EditFirmaProps> = (props: EditFirmaProps) => {

  const [esEdicion, setEsEdicion] = useState<boolean>(false);
  const handleSetFirma = (data: any) => {
    props?.enAccion(data)
  }
  return (
    <Grid container spacing={2} style={
      props?.darkMode
        ? {
          backgroundColor: "#1f283e",
          padding: "10px",

        }
        : { backgroundColor: "#fff", padding: "10px" }
    }>

      <Grid
        item
        xs={12}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <Avatar className="AvatarUser" alt={''} src={props?.item?.imagen} sx={{ width: 100, height: 100 }} />
      </Grid>

      <Grid item
        xs={12}
        style={{ justifyContent: "center", display: "flex" }}>
        <h5>{props?.item?.firma_txt}</h5>
      </Grid>
      <Grid item xs={12} md={12} style={{ justifyContent: "center", display: "flex" }}>
        <Button
          variant="primary"
          onClick={(e: any) => {
            setEsEdicion(true);
          }}
        >
          <DrawIcon /> Editar firma
        </Button>
      </Grid>
      {
        esEdicion ? <SetFirmaForm procesando={props?.procesando} darkMode={props?.darkMode} enAccion={(data) => handleSetFirma(data)} /> : <></>
      }
    </Grid>
  )
}

export default EditFirma
