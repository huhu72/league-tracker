import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Table from './Components/Table/Table';
import { Summoner } from './types';
import Players from './Components/Players/Players';
import axios from 'axios';

function App() {
	const [players, setPlayers] = useState<Summoner[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [playerNames, setPlayerNames] = useState([
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
	]);
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
		return (
			getRankValue(summoner.playerRank) +
			getTierValue(summoner.tier) +
			getLpValue(summoner.leaguePoints)
		);
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
		async function fetchData() {
			const result = await axios.get(`http://localhost:5000/user/GET`);
			if (result.status === 200) {
				setIsLoaded(true);
				const sortedPlayers = result.data.sort((a: Summoner, b: Summoner) => {
					return getPlayerValue(b) - getPlayerValue(a);
				});
				setPlayers(sortedPlayers);
			}
		}
		fetchData();
	}, []);

	function addToPlayerNames(newPlayerName: string) {
		setPlayerNames((prevPlayerNames) => {
			return [...prevPlayerNames, newPlayerName];
		});
	}

	return (
		<div className='App' style={{ display: 'flex', flexDirection: 'column' }}>
			{playerNames.map((player) => {
				return (
					<Players
						playerName={player}
						addPlayer={addPlayer}
						players={players}
						isLoaded={isLoaded}
					></Players>
				);
			})}
			<div className='table-container'>
				<Table
					data={players}
					tableRef={tableRef}
					addToPlayerNames={addToPlayerNames}
				></Table>
			</div>
			<button
				onClick={onAddRowClick}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Add Row
			</button>
		</div>
	);
}

export default App;
