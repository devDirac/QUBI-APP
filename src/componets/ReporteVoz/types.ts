export interface ReporteVozProps {
    envarVoz?:(voz:any,user:string)=>void
    envarVoces?:(voces:any,user:string)=>void
}

export interface tituloFormProps {
    darkMode:boolean
    enAccion:(parametro:any)=>void
}