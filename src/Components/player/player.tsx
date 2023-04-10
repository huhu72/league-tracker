import { Key, useEffect, useState } from 'react';
import { PlayerTypes, Summoner } from '../../types';
import axios from 'axios';
import './player.css';

interface PlayerProps {
	playerName: String;
	updatePlayers: (player: Summoner) => void;
}
export default function Player({ playerName, updatePlayers }: PlayerProps) {
	useEffect(() => {
		const url = `https://riot-backend.onrender.com/summoner/ranked?summoner=${playerName}`;
		axios.get(url).then((response) => {
			updatePlayers(response.data);
		});
	}, []);
	// eslint-disable-next-line no-lone-blocks

	return null;
}
