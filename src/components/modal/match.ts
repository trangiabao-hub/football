export type Result = {
  id: string;
  date: string;
  season_id: string;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  status_id: number;
  match_time: number;
  venue_id: string;
  referee_id: string;
  neutral: number;
  note: string;
  home_scores: number[];
  away_scores: number[];
  home_position: string;
  away_position: string;
  competition: CompetitionData;
  handicap: number;
  scoreHome: number;
  scoreAway: number;
  coverage: {
    animation: number;
    lineup: number;
  };
  round: {
    stage_id: string;
    group_num: number;
    round_num: number;
  };
  related_id: string;
  agg_score?: number[]; // Optional field since it might not exist
  environment?: {
    weather: number;
    pressure: string;
    temperature: string;
    wind: string;
    humidity: string;
  }; // Optional field since it might not exist
  updated_at: number;
  // Additional fields for mapped teams
  homeTeam?: TeamData;
  awayTeam?: TeamData;

  statistics: {
    time: number;
    type: string;
    statistics: {
      type: string;
      home: number;
      away: number;
    }[]
  }[]

  statisticCal: StatisticCalc []
}

interface StatisticCalc{
  label: string,
  home: number;
  away: number;
}

export interface TeamData {
  id: string;
  name: string;
  logo: string;
}

interface CompetitionData {
  id: string;
  name: string;
  logo: string;
}


