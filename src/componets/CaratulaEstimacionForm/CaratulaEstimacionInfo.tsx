import { Divider, Grid } from '@mui/material';
import { useIntl } from 'react-intl';
import { numericFormatter } from 'react-number-format';

interface Item {
    numEstimacionDefinitiva: string
    fechaEstDefinitiva: string
    cliente: string
    contratista: string
    origenRecursos: string
    periodo: string
    contratoNumero: string
    descripcionContrato: string

    importeContratado: string
    acumuladoAnterior: string
    estaEstimacion: string
    acumuladoActual: string
    saldo: string
    deduccionEstimacion: string
    amortizacion: string
    subtotal: string
    impuestoIva: string
    subTotal2: string
    devolucionRetencion: string
    retencion: string
    cargosAdicionales: string
    saldoPagarEstimacionActual: string
    importePagar: string


    anticipo: string
    amortizacionAcumuladoAnterior: string
    amortizacionActual: string
    anticipoAcumulado: string
    saldoPorAmortizar: string
    fondoGarantia: string
    fondoGarantiaAnterior: string
    fondoGarantiaAcumulado: string
    ivaRetencion: string
    ivaCargosAdicionales: string
    cifraTexto:string

}

interface CaratulaEstimacionInfoProps {
    darkMode: boolean
    item?: any//Item
}

const CaratulaEstimacionInfo = (props: CaratulaEstimacionInfoProps) => {
    const intl = useIntl();


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={
                        props?.darkMode
                            ? {
                                backgroundColor: "#1f283e",
                                padding: "10px",
                            }
                            : { backgroundColor: "#fff", padding: "10px", }
                    }
                >
                    <Grid container spacing={2}>
                        {/* Primera parte del formulario  */}
                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="numeroEstimacionDefinitiva">
                                {intl.formatMessage({ id: "input_numeroEstimacionDefinitivainfo" }) + ':' + props?.item?.numEstimacionDefinitiva}
                            </label>
                        </Grid>
                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="fechaEstimacionDefinitiva">
                                {intl.formatMessage({ id: "input_fechaEstimacionDefinitiva" }) + ':' + props?.item?.fechaEstDefinitiva}
                            </label>
                        </Grid>
                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="ubicacion">
                                {intl.formatMessage({ id: "gestion_contratos_cliente_titulo" }) + ':' + props?.item?.cliente}
                            </label>
                        </Grid>
                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="contratista">
                                {intl.formatMessage({ id: "input_contratista" }) + ':' + props?.item?.contratista}
                            </label>
                        </Grid>

                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="contratista">
                                {intl.formatMessage({ id: "input_origenRecursos" }) + ':' + props?.item?.origenRecursos}
                            </label>
                        </Grid>

                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="contratista">
                                {intl.formatMessage({ id: "general_periodo" }) + ':' + props?.item?.periodo}
                            </label>
                        </Grid>
                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="contratoNumero">
                                {intl.formatMessage({ id: "input_contrato_numero" }) + ':' + props?.item?.contratoNumero}
                            </label>
                        </Grid>
                        <Grid item xs={12} md={4} style={{fontSize:16}}>
                            <label htmlFor="descripcionContrato">
                                {intl.formatMessage({ id: "gestion_contratos_pep_descripcion" }) + ':' + props?.item?.descripcionContrato}
                            </label>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <hr />
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} md={6} style={{ padding: 14 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="descripcionContrato" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_importe_contrado" })}  <strong style={{float:'right'}}>{props?.item?.importeContratado}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="descripcionContrato" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "general_acumulado_anterior" })} <strong style={{float:'right'}}>{props?.item?.acumuladoAnterior}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="estaEstimacion" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "general_esta_estimacion" })} <strong style={{float:'right'}}>{props?.item?.estaEstimacion}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="acumuladoActual" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "general_acumulado_actual" })} <strong style={{float:'right'}}>{props?.item?.acumuladoActual}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="saldo" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "general_saldo" })} <strong style={{float:'right'}}>{props?.item?.saldo}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="deduccionEstimacion" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "general_deduccion_estimacion" })} <strong style={{float:'right'}}>{props?.item?.deduccionEstimacion}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="amortizacion" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_amoritzacion" })}  <small>[Esta estimación] :</small> <strong style={{float:'right'}}>{props?.item?.amortizacion}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="subtotal" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_subTotal" })} <strong style={{float:'right'}}>{props?.item?.subtotal}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="impuestoIva" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_iva" })} <strong style={{float:'right'}}>{props?.item?.impuestoIva}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="subTotal2" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_imp_total" })} <strong style={{float:'right'}}>{props?.item?.subTotal2}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="devolucionRetencion" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_devolucionRetencion" })} <strong style={{float:'right'}}>{props?.item?.devolucionRetencion}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="retencion" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_retencion" })} <strong style={{float:'right'}}>{props?.item?.retencion}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="cargosAdicionales" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_cargos_adicionales" })} <strong style={{float:'right'}}>{props?.item?.cargosAdicionales}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="saldoPagarEstimacionActual" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_saldo_pagar_esta_estimacion" })} <strong style={{float:'right'}}>{props?.item?.saldoPagarEstimacionActual}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="importePagar" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_importe_pagar" })} <strong style={{float:'right'}}>{props?.item?.importePagar}</strong>
                                        </label>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ padding: 14 }}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} md={12} >
                                        <label htmlFor="importePagar" style={{ textDecoration: 'underline' }}>
                                            {intl.formatMessage({ id: "amortizacion" })}<small> [{props?.item?.anticipo} %] </small>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipo"style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "gestion_contratos_anticipo" })} <strong style={{float:'right'}}>{  numericFormatter((((props?.item?.anticipo || 0)/100)* (+(props?.item?.importeContratado).replaceAll(',',''))) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' })  }</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="amortizacionAcumuladoAnterior" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "amortizacion" })} <small>[Acumulado anterior]:</small> <strong style={{float:'right'}}>{props?.item?.amortizacionAcumuladoAnterior}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="amortizacionActual" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "general_esta_estimacion" })} <small>[ { numericFormatter( ((props?.item?.amortizacionActual || 0)*100  /  (props?.item?.estaEstimacion).replaceAll(',','')) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' })  } %]</small> <strong style={{float:'right'}}>{props?.item?.amortizacionActual}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "gestion_contratos_anticipo" })} <small>[Acumulado actual]</small> <strong style={{float:'right'}}>{props?.item?.anticipoAcumulado}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "general_saldo_amortizar" })} <small>[Acumulado actual]</small> <strong style={{float:'right'}}>{props?.item?.saldoPorAmortizar}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{ textDecoration: 'underline' }}>
                                            {intl.formatMessage({ id: "general_retencion" })}
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_fondeGarantia_sin_porcentaje" })} <small>[{  numericFormatter( (((+(props?.item?.fondoGarantia||'0').replaceAll(',',''))/(+(props?.item?.importe_estaEstimacion||'0').replaceAll(',','')))*100) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }) } %]:</small> <strong style={{float:'right'}}>{props?.item?.fondoGarantia}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_fondeGarantia_sin_porcentaje" })} <small>[Acumulado anterior]:</small>  <strong style={{float:'right'}}>{props?.item?.fondoGarantiaAnterior}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_fondeGarantia_sin_porcentaje" })} <small>[Acumulado actual]:</small> <strong style={{float:'right'}}>{props?.item?.fondoGarantiaAcumulado}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_iva_retencion" })} <strong style={{float:'right'}}>{props?.item?.ivaRetencion}</strong>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{ textDecoration: 'underline' }}>
                                            {intl.formatMessage({ id: "input_cargos_adicionales" })}
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label htmlFor="anticipoAcumulado" style={{width:'100%'}}>
                                            {intl.formatMessage({ id: "input_iva_cargos_adicionales" })} <strong style={{float:'right'}}>{props?.item?.ivaCargosAdicionales}</strong>
                                        </label>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <p>({props?.item?.cifraTexto} {props?.item?.alcanceLiquido.substring(props?.item?.alcanceLiquido.indexOf('.') + 1, props?.item?.alcanceLiquido.length)}/100 {props?.item?.moneda || 'M.N'})</p>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <hr />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CaratulaEstimacionInfo