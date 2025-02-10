import React, { useState } from 'react'

const TablaDinamicaExcel = () => {
 // Datos iniciales
 const [data, setData] = useState([
    { name: "Producto A", cantidad: 10, precio: 20 },
    { name: "Producto B", cantidad: 5, precio: 50 },
  ]);

  const [filters, setFilters] = useState({
    name: "",
    cantidad: "",
    precio: "",
  });

  const [sortConfig, setSortConfig] = useState<any>(null);

  // Manejador para editar celdas
  const handleEdit = (rowIndex:any, columnKey:any, value:any) => {
    const updatedData:any = [...data];
    updatedData[rowIndex][columnKey] = value;
    setData(updatedData);
  };

  // Agregar una nueva fila
  const handleAddRow = () => {
    setData([...data, { name: "", cantidad: 0, precio: 0 }]);
  };

  // Eliminar una fila por índice
  const handleDeleteRow = (rowIndex:any) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  // Ordenar las columnas
  const handleSort = (columnKey:any) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === columnKey &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });

    const sortedData = [...data].sort((a:any, b:any) => {
      if (a[columnKey] < b[columnKey]) return direction === "asc" ? -1 : 1;
      if (a[columnKey] > b[columnKey]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  // Filtrar las columnas
  const handleFilter = (columnKey:any, value:any) => {
    setFilters({ ...filters, [columnKey]: value });
  };

  const filteredData = data.filter((row) => {
    return (
      row.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.cantidad === "" ||
        row.cantidad.toString().includes(filters.cantidad)) &&
      (filters.precio === "" || row.precio.toString().includes(filters.precio))
    );
  });

  // Exportar a CSV
  const exportToCSV = () => {
    const csvRows = [
      ["Nombre", "Cantidad", "Precio", "Total"],
      ...data.map((row) => [
        row.name,
        row.cantidad,
        row.precio,
        row.cantidad * row.precio,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "tabla_dinamica.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Tabla Dinámica Nativa</h2>
      <button onClick={handleAddRow}>Agregar Fila</button>
      <button onClick={exportToCSV}>Exportar a CSV</button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>
              <input
                type="text"
                placeholder="Filtrar Nombre"
                value={filters.name}
                onChange={(e) => handleFilter("name", e.target.value)}
              />
              <button onClick={() => handleSort("name")}>Nombre</button>
            </th>
            <th>
              <input
                type="text"
                placeholder="Filtrar Cantidad"
                value={filters.cantidad}
                onChange={(e) => handleFilter("cantidad", e.target.value)}
              />
              <button onClick={() => handleSort("cantidad")}>Cantidad</button>
            </th>
            <th>
              <input
                type="text"
                placeholder="Filtrar Precio"
                value={filters.precio}
                onChange={(e) => handleFilter("precio", e.target.value)}
              />
              <button onClick={() => handleSort("precio")}>Precio</button>
            </th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleEdit(rowIndex, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.cantidad}
                  onChange={(e) =>
                    handleEdit(rowIndex, "cantidad", parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.precio}
                  onChange={(e) =>
                    handleEdit(rowIndex, "precio", parseFloat(e.target.value))
                  }
                />
              </td>
              <td>{(row.cantidad * row.precio).toFixed(2)}</td>
              <td>
                <button onClick={() => handleDeleteRow(rowIndex)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDinamicaExcel
