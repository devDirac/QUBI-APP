
export interface CaratulaEstimacionFormProps {
    procesando: boolean
    elementosPorEstimar: any[]
    enAccion: (data: any) => void
    darkMode: boolean
    item?: any
    infoEstimacion?:any
    onAddDeductiva?:()=>void
    onSelectDeductivas?:()=>void
    deductivasExternas?:number
    verDeductivas?:()=>void
    deductivas?:string
    pepsContrato?:any
}