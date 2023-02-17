import { Key, useEffect, useState } from "react";
import { PlayerTypes, Summoner } from "../../types";
import axios from "axios";
import "./player.css";

interface PlayerProps {
  playerName: String;
  players: Summoner[];
  updatePlayers: (player: Summoner) => void;
}
export default function Player({
  playerName,
  players,
  updatePlayers,
}: PlayerProps) {
  const [summoner, setSummoner] = useState<Summoner>();

  useEffect(() => {
    //console.log(`${playerName}`);
    const url = `https://riot-backend.onrender.com/summoner/ranked?summoner=${playerName}`;
    axios.get(url).then((response) => {
      setSummoner(response.data);
      updatePlayers(response.data);
      //console.log(response.data);
    });
  }, [playerName]);
  // eslint-disable-next-line no-lone-blocks
  const unknownSummoner: Summoner = {
    summonerName: playerName,
    summonerLevel: summoner?.summonerLevel,
    tier: "NA",
    rank: "NA",
  };
  return (
    <div>
      {/* <tr>
        <td>{summoner?.summonerName || playerName}</td>
        <td>{summoner?.summonerLevel || "Loading..."}</td>
        <td>{(summoner?.tier ? summoner?.tier : "NA") || "Loading..."}</td>
        <td>{(summoner?.rank ? summoner?.rank : "NA") || "Loading..."}</td>
      </tr>
  */}
    </div>
  );
}
// return (
//   <div>
//     <p>{player.summonerName}</p>
//     <p>Level: {summoner?.summonerLevel || "Loading..."}</p>
//     <p>Tier: {(summoner?.tier ? summoner?.tier : "NA") || "Loading..."}</p>
//     <p>Rank: {(summoner?.rank ? summoner?.rank : "NA") || "Loading..."}</p>
//   </div>
// );
