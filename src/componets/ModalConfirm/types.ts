export interface ModalConfirmProps {
    onAcept:(comentarios?:string)=>void
    onCancel:()=>void
    open:boolean
    text:string
    title:string
    esCambioEstatusEstimacion?:boolean
}