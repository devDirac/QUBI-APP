export interface TipoUsuario{
    id:number
    tipo:string
    created_at:string
    updated_at:string
}
export interface UserD {
    id?: number
    name?: string
    email?: string
    telefono?:string
    foto?:string
    tipo_usuario?:TipoUsuario[]
    ajustes_sitio?:any
    usuario?:string
    created_at?: string
    updated_at?: string
    proyectos?:any[]
    contratos?:any[]
    empresa?:string
}
export interface LoginAction {
    usuario?: UserD | string
    data?: UserD
    token?: string
    password?: string
    valueCaptcha?:string
}
export interface LoginFormProps {
    procesando: boolean
    enAccion: (data: LoginAction) => void;
    captchaRecet?:boolean
}