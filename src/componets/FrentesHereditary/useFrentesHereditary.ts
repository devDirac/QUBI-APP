import { useEffect, useState } from 'react'
import type { FrentesHereditaryProps } from './types';

const useFrentesHereditary = (props: FrentesHereditaryProps) => {
    const [final, setFinal] = useState<any[]>([]);

    const handleInit = (idActual: any) => {
        const frente = (props?.frentes || []).find(e => e?.id === idActual);
        setFinal(oldArray => [...oldArray, frente]);
        if (frente?.id_frente !== 0) {
            handleInit(+frente?.id_frente);
        }
    }

    useEffect(() => {
        handleInit(+props?.frente);
    }, [props?.frente]);

    return {
        final
    }
}

export default useFrentesHereditary
