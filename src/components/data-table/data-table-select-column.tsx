import { ColumnDef, Row, Table } from "@tanstack/react-table"

import { Checkbox } from "../ui/checkbox"

export function DataTableSelectColumn<TData>({ table }: { table: Table<TData> }) {
  return (
    <Checkbox
      aria-label="Select all"
      checked={
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
    />
  )
}

export function DataTableSelectRowCell<TRow>({ row }: { row: Row<TRow> }) {
  return (
    <Checkbox
      aria-label="Select row"
      checked={row.getIsSelected()}
      onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
    />
  )
}

export function dataTableSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => <DataTableSelectColumn table={table} />,
    cell: ({ row }) => <DataTableSelectRowCell row={row} />,
  }
}
