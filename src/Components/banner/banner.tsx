import * as React from "react";
import { BannerTypes } from "../../types";

import Player from "../player/player";
function Banner(props: BannerTypes) {
  return (
    <div
      className="banner"
      style={{
        display: "inline-block",
        margin: "2px 40px",
        width: "150px",
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Player summonerName={props.summoner}></Player>
    </div>
  );
}

export default Banner;
