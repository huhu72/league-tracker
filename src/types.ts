export interface BannerTypes {
	summoner: string;
}
export interface PlayerTypes {
	summonerName: string;
}
export interface Summoner {
	summonerName?: string;
	encriptedId?: string;
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
	hasData: boolean;
	addPlayer: (player: Summoner) => void;
	compareDates: (date: string) => boolean;
	getPlayerFromRiotAPI: (playerName: String) => void;
	setPlayers: React.Dispatch<React.SetStateAction<Summoner[]>>;
}
export interface tableProps {
	data: Summoner[];
	addToPlayerNames: (player: string) => void;
	tableRef: React.RefObject<HTMLTableElement>;
}
