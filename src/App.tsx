import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Banner from "./Components/banner/banner";

function App() {
  const p = [
    "huhu72",
    "Fenoom",
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
  return (
    <div className="App">
      {p.map((player) => {
        return <Banner summoner={player}></Banner>;
      })}
    </div>
  );
}

export default App;
