import React, { useCallback, useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import AddCommentIcon from '@mui/icons-material/AddComment';

interface VolumenProps {
    value: string
    name: string
    id: string
    onValue: (val: any) => void
    darkMode: boolean
    prefix: string
    volumen_estimar: number
    enComentario: () => void
    comentarios_estimacion: string
}

const Volumen: React.FC<VolumenProps> = (props: VolumenProps) => {
    const [value, setValue] = useState<string>(props?.value);

    return (
        <InputGroup>
            <InputGroupText style={{ fontSize: '12px' }}>
                {props?.prefix || ''}
            </InputGroupText>
            <Form.Control
                value={value}
                name={'volumen_' + props?.id}
                id={'volumen_' + props?.id}
                onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    setValue(+target?.value <= 0 ? '0.000001' : (+target?.value > props?.volumen_estimar) ? props?.volumen_estimar + '' : target?.value);
                }}
                max={+props?.value}
                type="number"
                placeholder={'Ingrese el volumen'}
                style={props?.darkMode ? { borderRight: 'none', backgroundColor: 'transparent', color: 'white' } : { borderRight: 'none' }}
            />
            <br></br>
            {+value < props?.volumen_estimar ? <p style={{ color: '#1A73E8', fontSize: '14px', cursor: 'pointer' }} onClick={() => props?.enComentario()}>
                <AddCommentIcon />  {props?.comentarios_estimacion === '' ? 'Agregar comentario' : 'Edita comentario'}
            </p> : <></>}

        </InputGroup>
    )
}

export default Volumen
