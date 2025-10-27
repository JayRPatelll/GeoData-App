import { useEffect, useMemo, useRef } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { EarthquakeData } from "../store/datastore";
import type { Virtualizer, VirtualizerOptions } from "@tanstack/react-virtual";
import React from "react";
import useDataStore from "../store/datastore";

interface DataPanelProps {
    tableData: EarthquakeData[];
    setSelectedData: (item: EarthquakeData) => void;
    selectData: string | null;
}

const columnHelper = createColumnHelper<EarthquakeData>();
const columns = [
    columnHelper.accessor("id", { header: "Id" }),
    columnHelper.accessor("mag", { header: "Magnitude" }),
    columnHelper.accessor("time", { header: "Time" }),
    columnHelper.accessor("place", { header: "Location" }),
    columnHelper.accessor("latitude", { header: "Latitude" }),
    columnHelper.accessor("longitude", { header: "Longitude" }),
];

function DataPanel({tableData, setSelectedData}: DataPanelProps) {

    const memoData = useMemo(() => tableData, []);
    const memoColumns = useMemo(() => columns, []);

    const selectData = useDataStore((state) => state.selectedItem);

    const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});

    const table = useReactTable({
        data: memoData,
        columns: memoColumns,
        getCoreRowModel: getCoreRowModel(),
    });
        
    useEffect(() => {
        if (selectData && rowRefs.current[selectData]) {
            rowRefs.current[selectData].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectData]);
    
    return (
        <>
            <div className="w-full p-4 rounded shadow mt-4 overflow-x-auto h-80">
                <h1 className="text-xl text-white font-bold mb-4">
                </h1>
                <table className="min-w-full border">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                            <th key={header.id} className="p-2 border">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            ref={el => rowRefs.current[row.original.id] = el}
                            onClick={() => setSelectedData(row.original.id)}
                            className={row.id == selectData ? "border-2 border-solid border-blue-600" : "cursor-pointer"}
                            >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={ row.id == selectData ? "p-2 border border-2 border-blue-600 text-blue": "p-2 border"}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        </>
    );
    }

export default DataPanel;


