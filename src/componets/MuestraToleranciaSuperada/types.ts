export interface MuestraToleranciaSuperadaProps {
    importeCatalogo:string
    diferencia:string
    tolerancia:string
    onCancel:()=>void
    onAcept:()=>void
    open:boolean
}