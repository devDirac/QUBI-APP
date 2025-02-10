export interface FiltrosNewDashboardProductividadProps {
    procesando:boolean
    enAccion:(data:any)=>void
    enTipo:(tipo:any)=>void
    fecha_ini?:string
    fecha_fin?:string
    contratistas:any[]
    notDisabledOpcion2?:boolean
}