export interface FiltrosNewDashboardBitacoraEstimacionesProps {
    procesando:boolean
    enAccion:(data:any)=>void
    esConsultaEstimaciones?:boolean
    fecha_ini?:string
    fecha_fin?:string
    contratistas:any[]
}