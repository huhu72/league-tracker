import { Key, useEffect, useState } from 'react';
import { PlayerProps, Summoner } from '../../types';
import axios from 'axios';
import './Players.css';

export default function Player({ defaultListOfPlayerName, addPlayer, players, hasData, compareDates, getPlayerFromRiotAPI, setPlayers }: PlayerProps) {
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
	//Players need to remove the last player in the list due to when the add row button is clicked because in order to add the text box to the row, a new player with no name need to be added
	useEffect(() => {
		async function fetchData() {
			if (!players.some((player_table) => player_table.summonerName === defaultListOfPlayerName)) {
				const removeEmptyPlayer = [...players];
				removeEmptyPlayer.pop();
				setPlayers(removeEmptyPlayer);
				getPlayerFromFirebaseDB(defaultListOfPlayerName);
			}
		}
		fetchData();
	}, [hasData]);

	async function getPlayerFromFirebaseDB(playerName: String) {
		axios.get(`${process.env.REACT_APP_GET_USER_FROM_DB_URL}?summoner=${playerName}`).then((response) => {
			if (response.status === 204 || response.status === 404) {
				console.log('Getting data from Riot API');
				getPlayerFromRiotAPI(playerName);
			} else {
				//console.log(response.data.lastUpdated);
				if (response.data.lastUpdated === undefined || compareDates(response.data.lastUpdated)) {
					getPlayerFromRiotAPI(playerName);
				} else {
					console.log('Got data from Firebase');

					addPlayer(response.data);
				}
			}
		});
	}

	return null;
}
