export interface BannerTypes {
  summoner: string;
}
export interface PlayerTypes {
  summonerName: string;
}
export interface Summoner {
  accountId?: String;
  profileIconId?: number;
  summonerName?: String;
  encriptedId?: String;
  puuid?: String;
  summonerLevel?: number;
  tier?: string;
  rank?: string;
  leaguePoints?: number;
  wins?: number;
  losses?: number;
}
