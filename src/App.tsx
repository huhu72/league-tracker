import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Table from './Components/Table/Table';
import { Summoner } from './types';
import Players from './Components/Players/Players';
import axios from 'axios';

function App() {
	const [players, setPlayers] = useState<Summoner[]>([]);
	const [hasData, setHasData] = useState(false);
	const [defaultListPlayerNames, setDefaultListPlayerNames] = useState<string[]>([]);
	const onAddRowClick = () => {
		setPlayers(
			players.concat({
				summonerName: '',
				summonerLevel: 0,
				tier: 'NA',
				playerRank: 'NA',
				leaguePoints: 0,
			})
		);
	};
	const tableRef = useRef<HTMLTableElement>(null);

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
		return getRankValue(summoner.playerRank) + getTierValue(summoner.tier) + getLpValue(summoner.leaguePoints);
	}
	const tierMap = new Map();
	tierMap.set('NA', 0);
	tierMap.set('IRON', 100);
	tierMap.set('BRONZE', 500);
	tierMap.set('SILVER', 900);
	tierMap.set('GOLD', 1300);
	tierMap.set('PLATINUM', 1700);
	tierMap.set('DIAMOND', 2100);
	tierMap.set('MASTER', 2500);
	tierMap.set('GRANDMASTER', 2200);
	tierMap.set('CHALLENGER', 2500);
	const rankMap = new Map();
	rankMap.set('NA', -100);
	rankMap.set('I', 300);
	rankMap.set('II', 200);
	rankMap.set('III', 100);
	rankMap.set('IV', 0);

	function addPlayer(newPlayer: Summoner): void {
		setPlayers((prevPlayers) => {
			const updatedPlayers = [...prevPlayers, newPlayer];
			return updatedPlayers.sort((a, b) => {
				return getPlayerValue(b) - getPlayerValue(a);
			});
		});
	}
	useEffect(() => {
		async function getPlayersFromDB() {
			axios.get(`${process.env.REACT_APP_GET_USERS_FROM_DB_URL}`).then((response) => {
				if (response.status === 204 || response.status === 404) {
					console.log('Databse is empty');
					return;
				} else {
					console.log(response.data);

					for (var summoner of response.data) {
						if (compareDates(response.data.lastUpdated)) {
							getPlayerFromRiotAPI(summoner.summonerName);
						} else {
							console.log('Got data from Firebase');
							addPlayer(summoner);
						}
					}
					setHasData(true);
				}
			});
		}
		getPlayersFromDB();
	}, []);

	function addToPlayerNames(newPlayerName: string) {
		setDefaultListPlayerNames((prevPlayerNames) => {
			return [...prevPlayerNames, newPlayerName];
		});
	}
	function compareDates(date1: string): boolean {
		const now = new Date();
		//console.log('now ' + now);
		const lastUpdated = new Date(date1);
		const msBetweenDates = Math.abs(now.getTime() - lastUpdated.getTime());
		const daysbetweenDates = msBetweenDates / (24 * 60 * 1000);

		return daysbetweenDates >= 5 ? true : false;
	}
	async function getPlayerFromRiotAPI(playerName: String) {
		axios
			.get(`${process.env.REACT_APP_GET_RANKED_INFO_URL}?summoner=${playerName}`)
			.then((response) => {
				response.data.lastUpdated = new Date();
				// console.log(playerName + ' to database');
				addPlayer(response.data);
				axios.post(`${process.env.REACT_APP_POST_URL}`, response.data);
				// .then(function (response) {
				// 	console.log(response);
				// })
				// .catch(function (error) {
				// 	console.log(error);
				// });
			})
			.catch((error) => {});
	}

	return (
		<div className='App' style={{ display: 'flex', flexDirection: 'column' }}>
			{defaultListPlayerNames.map((player) => {
				return (
					<Players
						defaultListOfPlayerName={player}
						addPlayer={addPlayer}
						players={players}
						hasData={hasData}
						compareDates={compareDates}
						getPlayerFromRiotAPI={getPlayerFromRiotAPI}
						setPlayers={setPlayers}
					></Players>
				);
			})}
			<div className='table-container'>
				<Table data={players} tableRef={tableRef} addToPlayerNames={addToPlayerNames}></Table>
			</div>
			<button onClick={onAddRowClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
				Add Row
			</button>
		</div>
	);
}

export default App;
