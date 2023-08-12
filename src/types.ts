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
	playerRank?: string;
	leaguePoints?: number;
	wins?: number;
	losses?: number;
	queueType?: string;
	last_updated?: Date;
}
export interface PlayerProps {
	defaultListOfPlayerName: String;
	players: Summoner[];
	isLoaded: boolean;
	addPlayer: (player: Summoner) => void;
}
export interface tableProps {
	data: Summoner[];
	addToPlayerNames: (player: string) => void;
	tableRef: React.RefObject<HTMLTableElement>;
}
