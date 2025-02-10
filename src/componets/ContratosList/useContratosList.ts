import { useEffect, useState } from "react";
import type { ContratosListProps } from "./types";
import _ from "lodash";

const useContratosList = (props: ContratosListProps) => {
    const [data, setData] = useState<any[]>(props?.data);
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const handleFiltro = (textoFiltrar: string) => {
        const text_ = textoFiltrar.toLowerCase().replaceAll('á','a').replaceAll('é','e').replaceAll('í','i').replaceAll('ó','o').replaceAll('ú','u');
        const clonUser = Object.assign([], props?.data);
        if (_.isEmpty(textoFiltrar)) {
            setData(props?.data);
            return;
        }
        setData(
            clonUser.filter(
                (c: any) =>
                    (c?.contrato || '').toLowerCase().replaceAll('á','a').replaceAll('é','e').replaceAll('í','i').replaceAll('ó','o').replaceAll('ú','u').includes(text_.trim()) ||
                    (c?.contratista || '').toLowerCase().replaceAll('á','a').replaceAll('é','e').replaceAll('í','i').replaceAll('ó','o').replaceAll('ú','u').includes(text_.trim())
            )
        );
    };

    useEffect(()=>{
        setData(props?.data)
    },[props?.data])

    return {
        handleFiltro,
        data,
        checkAll, 
        setCheckAll
    }
}

export default useContratosList
