interface DataRow {
    id?: any
    id_estatus?:any
    estatus_1?:any
    estatus?:any
    estatusNumero?:any
    activo?:any
    revisores?:number
    revision?:number
    autorizar?:any
    posicion?:any
    disponible?:any
  }
  
  export interface AccionesTableProps {
    enAccion: (accion: any) => void;
    row: DataRow;
    titulo?: boolean
    tit?: string
    esContrato?:boolean
    esFrentes?:boolean
    esAvancePorConfirmar?:boolean
    esEstimacionesContratista?:boolean
    esEstimacionesCreadasContratista?:boolean
    esListaEstimacionesDefinitivas?:boolean
    esMatriz?:boolean
    esCatalogoDeConceptos?:boolean
    esHito?:boolean
    esResponsablesConcepto?:boolean
    esPrograma?:boolean
    esDocumentoFrente?:boolean
    esInsumos?:boolean
    esEntradasSalidas?:boolean
    esParametrosAnalisis?:any
    accioesBitacoraEstimaciones?:boolean
    accioesConsultaEstimaciones?:boolean
    verDetalleNewDashbaord?:boolean
    proyectoAgregarValores?:boolean
    proyectoAgregarValoresConceptos?:boolean
    proyectoCatalogoEliminarValores?:boolean
    esProgramaGuardado?:boolean
    esUsuariosGeocerca?:boolean
    esEdicionConceptos?:boolean
    esGenerarPaquete?:boolean
    esInfoCarrusel?:boolean
    soloEliminar?:boolean
  }
  

  export interface DinamicTableProps {
    data: any;
    semaforo?: boolean;
    titulo?: string;
    esUsuarioReporte?: boolean;
    actions?: boolean;
    enAccion?: (accion: string, row: any, idPermiso?:number) => void;
    opcionesRepo?:boolean
    esExpandible?:boolean
    ExpandedComponent?:any
    columnsToShow?:any
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
    noOrdenaColumnas?:any
    esAvanceConGrafica?:any
    esCPO?:boolean
    newDashboardContratosVencer?:boolean
    accioesBitacoraEstimaciones?:boolean
    accioesConsultaEstimaciones?:boolean
    verDetalleNewDashbaord?:boolean
    esPendienteContabilizar?:boolean
    esDetalleOeneUno?:boolean
  }