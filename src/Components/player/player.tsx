import { useEffect, useState } from "react";
import { PlayerTypes, Summoner } from "../../types";
import axios from "axios";

const Player = (player: PlayerTypes) => {
  const [summoner, setSummoner] = useState<Summoner>();

  useEffect(() => {
    console.log(`${player.summonerName}`);
    const url = `https://riot-backend.onrender.com/summoner/ranked?summoner=${player.summonerName}`;
    axios.get(url).then((response) => {
      setSummoner(response.data);
      console.log(response.data);
    });
  }, [player.summonerName]);
  return (
    <div>
      <p>{player.summonerName}</p>
      <p>Level: {summoner?.summonerLevel}</p>
      <p>Tier: {summoner?.tier ? summoner?.tier : "NA"}</p>
      <p>Rank: {summoner?.rank ? summoner?.rank : "NA"}</p>
    </div>
  );
};
export default Player;
