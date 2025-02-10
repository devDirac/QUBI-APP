export interface AltaMasivaFrentesProps {
    procesando:boolean
    onSelect:(data:any, file:File)=>void
    onErrorDocumento:()=>void
    titulo:string
    columnas?:string[]
}