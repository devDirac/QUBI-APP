
export interface FiltrosFechasProps {
    procesando: boolean
    enAccion: (data: any) => void
    fecha_ini?:string
    fecha_fin?:string
}