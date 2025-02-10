import React, { useMemo } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import type { DinamicTableProps } from "./types";
import { useAccionesTable } from "./useDinamicTable";
import './style.scss';
import SearchFiltro from "../../componets/SearchFiltro/SearchFiltro";
import GetAppIcon from '@mui/icons-material/GetApp';
import { numericFormatter } from "react-number-format";
import Progreso from "../../componets/Progreso";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

const DinamicTable: React.FC<DinamicTableProps> = (props: DinamicTableProps) => {

  const {
    columns,
    handleRowClicked,
    customStyles,
    conditionalRowStyles,
    darkMode,
    handleFiltro,
    data,
    handleExportarExcel
  } = useAccionesTable(props);


  const CustomFooter = () => {
    const sumaImporte = (props?.data || []).reduce((a: any, c: any) => { return a + (+c?.importe.replaceAll('$', '').replaceAll(',', '')) }, 0);
    const sumaAmortizacion = (data || []).reduce((a: any, c: any) => { return a + (+c?.amortizacion.replaceAll('$', '').replaceAll(',', '')) }, 0);
    const sumaRetenciones = (data || []).reduce((a: any, c: any) => { return a + (+c?.rentenciones.replaceAll('$', '').replaceAll(',', '')) }, 0);
    const sumSaldo_obra_con_iva = (data || []).reduce((a: any, c: any) => { return a + (+c?.saldo_obra_con_iva.replaceAll('$', '').replaceAll(',', '')) }, 0);
    const sumAvance_obra = (data || []).reduce((a: any, c: any) => { return a + (+c?.avance_obra.replaceAll('%', '').replaceAll(',', '')) }, 0);
    return (
      <div style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f1f1f1' }}>
        <p style={{ fontWeight: 'bolder', fontSize: 12 }}>Importe : {numericFormatter((sumaImporte + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p>
        <p style={{ fontWeight: 'bolder', fontSize: 12 }}>Amortización : {numericFormatter((sumaAmortizacion + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p>
        <p style={{ fontWeight: 'bolder', fontSize: 12 }}>Retenciones C/IVA :{numericFormatter((sumaRetenciones + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p>
        <p style={{ fontWeight: 'bolder', fontSize: 12 }}>Saldo obra C/IVA : {numericFormatter((sumSaldo_obra_con_iva + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p>
        <p style={{ fontWeight: 'bolder', fontSize: 12 }}>% Avance obra : {numericFormatter((sumAvance_obra + '' || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</p>
        <Progreso avance={sumAvance_obra} />
      </div>
    )
  };

  return (
    <div>
      <Grid container direction={"row"}>
        <Grid item xs={12} style={{ padding: "12px" }}>
          <h3 style={darkMode ? { color: 'white' } : { color: '#344767' }}>{props?.titulo || ""}</h3>
        </Grid>
        <Grid container direction={"row-reverse"}>
          {!props?.sinExport ? <Grid item xs={12} md={2} style={{ textAlign: 'center', padding: '24px' }}>
            <Tooltip title="Exportar a excel">
              <IconButton disabled={!data?.length} onClick={() => handleExportarExcel()} aria-label={''} size="small" style={{ color: darkMode ? '#4CAF50' : '#fff', backgroundColor: darkMode ? '#fff' : '#4CAF50', borderRadius: '5px', width: '100%' }}>
                <SimCardDownloadIcon />
              </IconButton>
            </Tooltip>
          </Grid> : null}
          <Grid item xs={12} md={4} style={{ textAlign: 'center', padding: '24px' }}>
            {useMemo(() => (!props?.sinFiltro ? <SearchFiltro onFiltro={(w: string) => { handleFiltro(w) }} /> : null), [])}
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ padding: "12px", border:'solid 1px rgb(223 223 223)' }}>
          <DataTable
            highlightOnHover
            pagination
            striped
            expandableRows={props?.esExpandible}
            expandableRowsComponent={props?.ExpandedComponent}
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por pagina',
              rangeSeparatorText: "de",
              selectAllRowsItem: true,
              selectAllRowsItemText: "Todos",
            }}
            columns={columns}
            className="table-bordered"
            onRowClicked={handleRowClicked}
            customStyles={customStyles}
            defaultSortAsc
            defaultSortFieldId={props?.ordernarColumna}
            conditionalRowStyles={conditionalRowStyles}
            data={data}
            selectableRows={props?.showCheckBox}
            {...props?.muestraTodosRegistros ? { paginationPerPage: data?.length } : {}}
            onSelectedRowsChange={(a) => props?.enCheckBox && props?.enCheckBox(a)}
            noDataComponent={<h1>Sin resultados</h1>}
            fixedHeader
            fixedHeaderScrollHeight="700px" 
            style={{ overflowX: 'auto' }}
          />
          {props?.esListaEstimacionesDefinitivas ? <CustomFooter /> : null}
        </Grid>
      </Grid>
    </div>
  );
};


export default DinamicTable;
