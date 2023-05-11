import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Column, useTable } from 'react-table';
import { Summoner, tableProps } from '../../types';
import './table.css';

export default function Table({ data, tableRef }: tableProps) {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (data) {
			setIsLoading(false);

			if (tableRef.current) {
				setIsLoading(false);
				const tableRows = tableRef.current.getElementsByTagName('tr');
				const newRow = tableRows[tableRows.length - 1];
				newRow.scrollIntoView();
			}
		} else {
			setIsLoading(true);
		}
	}, [data]);
	//console.log(data);
	const columns = useMemo<Column<Summoner>[]>(
		() => [
			{
				Header: 'Name',
				accessor: 'summonerName',
			},
			{
				Header: 'Level',
				accessor: 'summonerLevel',
			},
			{
				Header: 'Tier',
				accessor: 'tier',
			},
			{
				Header: 'Rank',
				accessor: 'playerRank',
			},
			{
				Header: 'LP',
				accessor: 'leaguePoints',
			},
		],
		[]
	);

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
		<>
			{' '}
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<table {...getTableProps()} ref={tableRef}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
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
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</>
	);
}
