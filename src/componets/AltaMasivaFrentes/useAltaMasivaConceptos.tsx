import { useRef } from 'react'
import type { AltaMasivaFrentesProps } from './types'
import readXlsxFile from 'read-excel-file'
import { useMaterialUIController } from 'context'
import _ from 'lodash'

const useAltaMasivaConceptos = (props: AltaMasivaFrentesProps) => {
    const reference = useRef(null);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const columns =  ["inciso", "concepto", "descripcion", "unidad", "cantidad", "pu", "fecha_inicio", "fecha_fin"];

    const handleArchivo = async (evt: any) => {
        try {
            const file = evt.target.files[0];
            readXlsxFile(file, { sheet: 1 }).then(async (rows: any) => {
                if (_.isEqual(rows[0], columns)) {
                    rows.shift();
                    props?.onSelect(rows, file);
                } else {
                    props?.onErrorDocumento();
                }
            }).catch(() => {
                props?.onErrorDocumento();
            });
        } catch (error) { }
    }


    return {
        darkMode,
        handleArchivo,
        reference
    }
}

export default useAltaMasivaConceptos
