import { LoginAction } from "../componets/LoginForm/types";

export interface HttpResponse {
    success: boolean,
    data: {
        employees: any
    }
}

export interface GeneralHttpResponse {
    config: any
    data: HttpResponse
    headers: any
    request: any
    status: number
    statusText: string
}



export interface AppType {
    user: LoginAction,
    employees: any
    upload: string[]
    idioma:string
    catalogos:any
    espacio:any
    ruta:any
    elementos_estimar:any[]
    notificaciones:any[]
    contrato:any
    flujoInicial:any
}

export interface StoreType {
    app: AppType
}

export interface TiposCatalogos {
    label: string 
    value: string
    esgenerico?:boolean
}

export interface CatalogosGenericos{
    id:string
    clave:string
    nombre:string
    descripcion:string
    id_estatus:number
    fecha_registro:string
    id_usuario:number
}

export interface HttpResponseCatalogo {
    success: boolean,
    data: {
        employees: CatalogosGenericos[]
    }
}

export interface GeneralHttpResponseCatalogo {
    config: any
    data: HttpResponseCatalogo
    headers: any
    request: any
    status: number
    statusText: string
}