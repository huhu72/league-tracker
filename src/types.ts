export interface BannerTypes {
	summoner: string;
}
export interface PlayerTypes {
	summonerName: string;
}
export interface Summoner {
	summonerName?: String;
	encriptedId?: String;
	summonerLevel?: number;
	tier?: string;
	rank?: string;
	leaguePoints?: number;
	wins?: number;
	losses?: number;
	queueType?: string;
	last_updated?: Date;
}
export interface PlayerProps {
	playerName: String;
	updatePlayers: (player: Summoner) => void;
}
