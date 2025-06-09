export interface Scores {
  teamId: number;
  gatheringId: number;
  type: string;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

export interface ScoreSummary {
  totalCount: number;
  scoreList: number[];
}
