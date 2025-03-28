import { Table } from "antd";
import React, { useMemo, useRef, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { Excel } from "antd-table-saveas-excel";
const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource,
    isPending = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelected] = useState([]);
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action")
    return arr
  }, [columns])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelected(selectedRowKeys);
    },
  };

  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <Loading isPending={isPending}>
      {!!rowSelectedKeys.length && (
        <div
          style={{
            background: "#FF6347",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
      <button onClick={exportExcel} style={{ 
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer",
      }}>Export Excel</button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
