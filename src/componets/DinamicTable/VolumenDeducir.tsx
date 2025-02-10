import React, { useCallback, useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import AddCommentIcon from '@mui/icons-material/AddComment';

interface VolumenProps {
    value: string
    id: string
    onValue: (val: any) => void
    darkMode: boolean
    volumen_estimado: number
  
}

const VolumenDeducir: React.FC<VolumenProps> = (props: VolumenProps) => {
    const [value, setValue] = useState<string>(props?.value);
    return (
        <InputGroup>
            <Form.Control
                value={value}
                name={'volumen_' + props?.id}
                id={'volumen_' + props?.id}
                onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    setValue(+target?.value < 0 ? '0' : (+target?.value > props?.volumen_estimado) ? props?.volumen_estimado + '' : target?.value);
                    props?.onValue({ id: props?.id, value: +target?.value < 0 ? '0' : (+target?.value > props?.volumen_estimado) ? props?.volumen_estimado + '' : target?.value })
                }}
                max={+props?.volumen_estimado}
                type="number"
                placeholder={'Ingrese el volumen a deducir'}
                style={props?.darkMode ? { borderRight: 'none', backgroundColor: 'transparent', color: 'white' } : { borderRight: 'none' }}
            />


        </InputGroup>
    )
}

export default VolumenDeducir
