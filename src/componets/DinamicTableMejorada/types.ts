
export interface DinamicTableMejoradaProps {
    flex?:boolean
    data:any
    columnsToShow?:any
    noOrdenaColumnas?:any
    pinned?:any[]

    esDetalleOeneUno?:any
    esInfoCarrusel?:boolean

    semaforo?: boolean;
    titulo?: string;
    esUsuarioReporte?: boolean;
    actions?: boolean;
    enAccion?: (accion: string, row: any, idPermiso?:number) => void;
    opcionesRepo?:boolean
    esExpandible?:boolean
    ExpandedComponent?:any
    
    esResponsablesConcepto?:boolean
    esContrato?:boolean
    onVerUsuariosAsignados?:(data:any)=>void
    verComentarios?:(data:any)=>void
    esFrentes?:boolean
    idProyectoActivo?:number
    esAvancePorConfirmar?:boolean
    tituloExcel?:string
    clickEnRow?:boolean
    showCheckBox?:boolean
    enCheckBox?:(rows:any)=>void
    onValueVolumen?:(valor:any)=>void
    muestraTodosRegistros?:boolean
    esListaEstimacionesDefinitivas?:boolean
    esEstimacionesContratista?:boolean
    esEstimacionesCreadasContratista?:boolean
    sinFiltro?:boolean
    sinExport?:boolean
    esMatriz?:boolean
    esCatalogoDeConceptos?:boolean
    esHito?:boolean
    esPrograma?:boolean
    esDocumentoFrente?:boolean
    esEdicionEstimacion?:boolean
    esInsumos?:boolean
    ordernarColumna?:string
    origenDestino?:any
    esEntradasSalidas?:any
    esParametrosAnalisis?:any
    esPlanMaestro?:any
    esAvanceConGrafica?:any
    esCPO?:boolean
    newDashboardContratosVencer?:boolean
    accioesBitacoraEstimaciones?:boolean
    accioesConsultaEstimaciones?:boolean
    verDetalleNewDashbaord?:boolean
    esPendienteContabilizar?:boolean
    proyectoAgregarValores?:boolean
    proyectoAgregarValoresConceptos?:boolean
    proyectoCatalogoEliminarValores?:boolean
    minHeight?:number
    footerRowData?:any
    esProgramaGuardado?:boolean
    esUsuariosGeocerca?:boolean
    esEdicionConceptos?:boolean
    esGenerarPaquete?:boolean
    soloEliminar?:boolean
}