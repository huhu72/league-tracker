import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Banner from "./Components/banner/banner";
import Player from "./Components/player/player";
import { useTable } from "react-table";
import { Summoner } from "./types";
import Table from "./Components/Table/Table";
import { platform } from "os";

function App() {
  const p: String[] = [
    "huhu72",
    "The Rizz",
    "XxSaltyPotatoxX",
    "Goblinguy9",
    "TheMountaineer",
    "milky milkers",
    "McEggs",
    "Curls for Jesus",
    "grizzlyging",
    "pretzelpaste",
    "shaco spitstain",
  ];
  const [players, setPlayers] = useState<Summoner[]>([]);

  function updatePlayers(player: Summoner): void {
    // console.log(player);
    setPlayers((players) => [...players, player]);
  }

  return (
    <div className="App">
      {p.map((player) => {
        return (
          <Player
            playerName={player}
            players={players}
            updatePlayers={updatePlayers}
          ></Player>
        );
      })}
      <Table playerData={players}></Table>
      {/* <table>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Tier</th>
          <th>Rank</th>
        </tr>
        {p.map((player) => {
          return <Player summonerName={player}></Player>;
        })}
      </table> */}
      {/* {p.map((player) => {
        return <Banner summoner={player}></Banner>;
      })} */}
    </div>
  );
}

export default App;
