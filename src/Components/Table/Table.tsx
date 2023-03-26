import * as React from 'react';
import { useState, useMemo } from 'react';
import { Column, useSortBy, useTable, Row } from 'react-table';
import { PlayerTypes, Summoner } from '../../types';
import './table.css';

export default function Table({ playerData }: { playerData: Summoner[] }) {
	//console.log(playerData);
	const tierMap = new Map();
	tierMap.set('NA', 0);
	tierMap.set('IRON', 100);
	tierMap.set('BRONZE', 400);
	tierMap.set('SILVER', 700);
	tierMap.set('GOLD', 1000);
	tierMap.set('PLATINUM', 1300);
	tierMap.set('DIAMOND', 1600);
	tierMap.set('MASTER', 1900);
	tierMap.set('GRANDMASTER', 2200);
	tierMap.set('CHALLENGER', 2500);
	const rankMap = new Map();
	rankMap.set('NA', -100);
	rankMap.set('I', 300);
	rankMap.set('II', 200);
	rankMap.set('III', 100);
	rankMap.set('IV', 0);
	function getRankValue(rank: string | undefined): number {
		if (rank === 'NA') {
			return 0;
		} else {
			return rankMap.get(rank);
		}
	}
	function getTierValue(tier: string | undefined): number {
		if (tier) {
			return tierMap.get(tier);
		} else return 0;
	}
	function getLpValue(leaguePoints: number | undefined): number {
		return leaguePoints ? leaguePoints : 0;
	}
	function getPlayerValue(
		rank: string | undefined,
		tier: string | undefined,
		lp: number | undefined
	): number {
		console.log(
			getRankValue(rank) + '+' + getTierValue(tier) + '+' + getLpValue(lp)
		);
		return getRankValue(rank) + getTierValue(tier) + getLpValue(lp);
	}

	playerData.sort((a, b) => {
		return (
			getPlayerValue(b.rank, b.tier, b.leaguePoints) -
			getPlayerValue(a.rank, a.tier, a.leaguePoints)
		);
	});
	// playerData = sortedPlayers;
	console.log(playerData);

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
				accessor: 'rank',
			},
			{
				Header: 'LP',
				accessor: 'leaguePoints',
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
	} = useTable(
		{
			columns,
			data,
		},
		useSortBy
	);
	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								<span>
									{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
								</span>
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
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
