import { Key, useEffect, useState } from 'react';
import { PlayerProps, Summoner } from '../../types';
import axios from 'axios';
import './Players.css';

export default function Player({
	playerName,
	addPlayer,
	players,
	isLoaded,
}: PlayerProps) {
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
			if (isLoaded) {
				if (!players.some((player) => player.summonerName === playerName)) {
					getPlayerFromRiotAPI(playerName);
				}
			}
		}
		fetchData();
	}, [isLoaded]);

	async function getPlayerFromRiotAPI(playerName: String) {
		axios
			.get(`http://localhost:5000/summoner/ranked?summoner=${playerName}`)
			.then((response) => {
				addPlayer(response.data);
				axios.post(`http://localhost:5000/user/POST`, response.data);
			})
			.catch((error) => {});
	}
	return null;
}
