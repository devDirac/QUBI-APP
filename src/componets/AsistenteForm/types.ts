export interface AsistenteFormFormProps{
    procesando:boolean
    enAccion:(data:any) => void
    esContacto?:boolean
    mensajeBienvenida?:string
    respuesta?:string
    urlInteligente?:string
    superAdministrador?:string
    respuestaId?:any
    enAccionCorrecta?:(id:any) => void
}