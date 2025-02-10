import React, { useCallback, useMemo } from 'react'
import { Grid, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { DinamicTableMejoradaProps } from './types';
import useDinamicTableMejorada from './useDinamicTableMejorada';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import './style.scss'
import ExpandendComp from './ExpandendComp';
import { numericFormatter } from 'react-number-format';
import Progreso from '../Progreso/index';


const DinamicTableMejorada: React.FC<DinamicTableMejoradaProps> = (props: DinamicTableMejoradaProps) => {
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 1000];
    const {
        columns,
        handleExportarExcel,
        darkMode,
        showExpandedComponent,
        setShowExpandedComponent,
        localeText,
        data
    } = useDinamicTableMejorada(props);

    const onSelectionChanged = (event: any) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node: any) => node.data);
        props?.enCheckBox && props?.enCheckBox(selectedData);
    };


    const onFirstDataRendered = useCallback((params: any) => {
        params.api.forEachNode((node: any) => {
            if (node?.data?.selected) {
                node.setSelected(true);
            }
        });
    }, []);

    const getRowStyle = (params: any) => {
        if (params.node?.data?.selected) {
            return { background: '#68aad4' };
        }
    };


    return (
        <Grid container spacing={2}>
            {props?.titulo ? <Grid item xs={12} md={12} >
                <h4>{props?.titulo}</h4>
            </Grid> : null}
            {!props?.sinExport ? <Grid item xs={12} md={11} style={{ textAlign: 'center', padding: '24px' }}> </Grid> : null}
            {!props?.sinExport ? <Grid item xs={12} md={1} style={{ textAlign: 'center', padding: '24px', paddingRight: 0 }}>
                <Tooltip title="Exportar a excel">
                    <IconButton disabled={!props?.data?.length} onClick={() => handleExportarExcel()} aria-label={''} size="small" style={{ color: darkMode ? '#4CAF50' : '#fff', backgroundColor: darkMode ? '#fff' : '#4CAF50', borderRadius: '5px', width: '100%' }}>
                        <SimCardDownloadIcon />
                    </IconButton>
                </Tooltip>
            </Grid> : null}
            <Grid item xs={12} md={12} className="ag-theme-quartz ag-theme-alpine custom-ag-grid" style={{ minHeight: props?.minHeight ? props?.minHeight : 500 }}>
                {props?.showCheckBox ? <AgGridReact
                    rowData={props?.data}
                    columnDefs={columns}
                    onFirstDataRendered={onFirstDataRendered}
                    pagination={props?.muestraTodosRegistros ? false : pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    detailRowHeight={150}
                    localeText={localeText}
                    getRowStyle={getRowStyle}
                    pinnedBottomRowData={props?.footerRowData || null}
                    rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: true,
                    }}
                    getRowId={(params) => params.data.id + ''}
                    onSelectionChanged={onSelectionChanged}
                /> : <AgGridReact
                    rowData={props?.data}
                    getRowStyle={getRowStyle}
                    columnDefs={columns}
                    pagination={props?.muestraTodosRegistros ? false : pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    detailRowHeight={150}
                    localeText={localeText}
                    pinnedBottomRowData={props?.footerRowData || null}

                />}
            </Grid>
            {
                showExpandedComponent ? <ExpandendComp handleisAlerCloseComentarios={() => setShowExpandedComponent(null)} children={React.cloneElement(props?.ExpandedComponent, showExpandedComponent)} /> : null
            }
           {/*  {
                props?.esListaEstimacionesDefinitivas ? <Grid item xs={12}><CustomFooter /></Grid> : null
            } */}
        </Grid>
    )
}

export default DinamicTableMejorada
