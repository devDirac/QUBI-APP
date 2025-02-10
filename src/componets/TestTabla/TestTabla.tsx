import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./style.scss";

const TestTabla = () => {
    const [rowData] = useState([

        { id: 1, name: "John", age: 25 },
        { id: 2, name: "Doe", age: 30 },
        { id: 3, name: "Jane", age: 28 },
    ]);

    const [columnDefs] = useState<any>([
        {
            headerName: "Select", // Opcional: título de la columna
            checkboxSelection: true, // Muestra un checkbox en cada fila
            headerCheckboxSelection: true, // Muestra un checkbox en el encabezado
            width: 850, // Ancho opcional de la columna
            suppressRowClickSelection: true, 
        },
        { field: "name", headerName: "Name" },
        { field: "age", headerName: "Age" },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
           { useMemo(() => (<AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection={{ 
                    mode: 'multiRow',
                    headerCheckbox: true,
                }}
                getRowId={(params) => params.data.id + ''}
                onSelectionChanged={(event) => {
                    const selectedRows = event.api.getSelectedRows();
                }}
            />), [rowData   ])
            }
        </div>
    );
};


export default TestTabla;