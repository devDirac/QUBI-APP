import { Grid } from '@mui/material';
import InputField from '../InputField';
import { FormikProvider } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';
import useSearchFiltro from './useSearchFiltro';
import './style.scss';
export interface SearchFiltroProps{
    onFiltro:(texto:string)=>void
    bg?:string
}

const SearchFiltro: React.FC<SearchFiltroProps> = (props:SearchFiltroProps) => {
    
    const {
        darkMode,
        formik,
        texto,
        setTexto
    } = useSearchFiltro(props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className='bordersContainers' >
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3">
                        <InputField
                            value={texto}
                            name="texto"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("texto", target?.value);
                                setTexto(target?.value);
                            }}
                            placeholder="Ingrese el texto de búsqueda, para filtrar los resultados"
                            type="text"
                            id="texto"
                            formik={formik?.getFieldMeta('texto')}
                        />
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default SearchFiltro
