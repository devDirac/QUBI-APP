export interface CampoAutoCompleteCoordenadasProps {
    label?: string
    id: string
    value?: string
    ref?:any
    name: string
    placeholder?: string
    required?: boolean
    autoFocus?: boolean
    fullWidth?: boolean
    disabled?: boolean
    onInput?: (e: any) => void
    onChange?: (e: any) => void
    InputProps?: any
    formik?:any
    onPlaceSelect:(data:any)=>void
    place?:string
}