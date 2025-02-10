export interface ContratosListProps {
    procesando:boolean
    data:any[]
    onSelect?:(c:any)=>void
    onSelectMembers?:(c:any)=>void
    esAsigacion?:boolean
    onCheck?:(v:any,e:any) => void
    onCheckAll?:(v:any) => void
    enAccionFormulario?:(formularioData:any,elemento:any)=>void
}