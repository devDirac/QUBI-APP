export interface SetFirmaFormProps {
    darkMode: boolean
    procesando: boolean
    enAccion: (data: any) => void
}

export interface AddFirmaFormProps {
    darkMode: boolean
    procesando: boolean
    enAccion: (data: any) => void
    item?:any
}