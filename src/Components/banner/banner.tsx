import * as React from 'react';
import { BannerTypes } from '../../types';

import Player from '../player/player'
function Banner (props:BannerTypes){ 
    
    return(
        <div className="banner" style={{display: 'inline-block', margin: '2px 40px'}}>
           <Player
                summonerName= {props.summoner}></Player>
        </div>
    )
}

export default Banner