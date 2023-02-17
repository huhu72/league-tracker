import * as React from "react";
import { useState, useMemo } from "react";
import { Column, useTable } from "react-table";
import { PlayerTypes, Summoner } from "../../types";
import "./table.css";

export default function Table({ playerData }: { playerData: Summoner[] }) {
  //console.log(playerData);
  const columns = useMemo<Column<Summoner>[]>(
    () => [
      {
        Header: "Name",
        accessor: "summonerName",
      },
      {
        Header: "Level",
        accessor: "summonerLevel",
      },
      {
        Header: "Rank",
        accessor: "rank",
      },
      {
        Header: "Tier",
        accessor: "tier",
      },
    ],
    []
  );
  const data = useMemo(() => playerData, [playerData]);

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
