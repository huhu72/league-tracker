import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Column, useSortBy, useTable, Row } from 'react-table';
import { Summoner } from '../../types';
import './table.css';
import axios from 'axios';

export default function Table() {
	const [players, setPlayers] = useState<Summoner[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const playerNames: String[] = [
		'huhu72',
		'The Rizz',
		'XxSaltyPotatoxX',
		'Goblinguy9',
		'TheMountaineer',
		'milky milkers',
		'McEggs',
		'Curls for Jesus',
		'grizzlyging',
		'pretzelpaste',
		'shaco spitstain',
	];

	useEffect(() => {
		const fetchData = async () => {
			const fetches = playerNames.map((playerName) => {
				const url = `https://riot-backend.onrender.com/summoner/ranked?summoner=${playerName}`;
				return axios.get(url).then((response) => response.data);
			});
			const results = await Promise.all(fetches);
			setIsLoading(false);
			results.forEach((player) => {
				addPlayer(player);
			});
		};
		fetchData();
	}, []);
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
	function getPlayerValue(summoner: Summoner): number {
		return (
			getRankValue(summoner.rank) +
			getTierValue(summoner.tier) +
			getLpValue(summoner.leaguePoints)
		);
	}

	console.log(players);

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
	function addPlayer(newPlayer: Summoner): void {
		setPlayers((prevPlayers) => {
			const updatedPlayers = [...prevPlayers, newPlayer];
			return updatedPlayers.sort((a, b) => {
				return getPlayerValue(b) - getPlayerValue(a);
			});
		});
	}

	const data = useMemo(() => players, [players]);

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
		<>
			{' '}
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
