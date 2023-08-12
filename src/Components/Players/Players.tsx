import { Key, useEffect, useState } from 'react';
import { PlayerProps, Summoner } from '../../types';
import axios from 'axios';
import './Players.css';

export default function Player({ defaultListOfPlayerName, addPlayer, players, isLoaded }: PlayerProps) {
	/*
//PUT:
const tempPlayer = {
				eid: '1',
				summonerName: 'huhu72',
				summonerLevel: 999,
			};
			axios.put(`http://localhost:5000/user/PUT`, tempPlayer);
//GET:
const result = await axios.get(`http://localhost:5000/user/GET`);

//POST:
const tempPlayer = {
			eid: '2',
			summonerName: 'huhu72',
			summonerLevel: 100000,
		};
		//axios.post(`http://localhost:5000/user/POST`, tempPlayer);

*/
	useEffect(() => {
		async function fetchData() {
			if (!players.some((player_table) => player_table.summonerName === defaultListOfPlayerName)) {
				getPlayerFromFirebaseDB(defaultListOfPlayerName);
			}
		}
		fetchData();
	}, [isLoaded]);

	async function getPlayerFromFirebaseDB(playerName: String) {
		axios.get(`http://localhost:5000/user/GET?summoner=${playerName}`).then((response) => {
			if (response.status === 204 || response.status === 404) {
				console.log('Getting data from Riot API');
				getPlayerFromRiotAPI(playerName);
			} else {
				//console.log(response.data.lastUpdated);
				if (response.data.lastUpdated === undefined || compareDates(response.data.lastUpdated)) {
					getPlayerFromRiotAPI(playerName);
				} else {
					console.log('Got data from Firebase');
					const dbData = response.data;
					dbData.summonerName = playerName;
					addPlayer(dbData);
				}
			}
		});
	}
	function compareDates(date1: Date): boolean {
		const now = new Date();
		console.log('now ' + now);
		const msBetweenDates = Math.abs(now.getTime() - date1.getTime());
		const daysbetweenDates = msBetweenDates / (24 * 60 * 1000);

		return daysbetweenDates >= 5 ? true : false;
	}
	async function getPlayerFromRiotAPI(playerName: String) {
		axios
			.get(`http://localhost:5000/summoner/ranked?summoner=${playerName}`)
			.then((response) => {
				response.data.lastUpdated = new Date();
				// console.log(playerName + ' to database');
				addPlayer(response.data);
				axios.post(`http://localhost:5000/user/POST`, response.data);
				// .then(function (response) {
				// 	console.log(response);
				// })
				// .catch(function (error) {
				// 	console.log(error);
				// });
			})
			.catch((error) => {});
	}
	return null;
}
