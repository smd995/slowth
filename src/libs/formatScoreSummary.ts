import { Scores, ScoreSummary } from "@/entities/review";

export const formatScoreSummary = (
  scores: Scores | undefined,
): ScoreSummary | undefined => {
  if (scores === undefined) return undefined;
  const scoreList = [
    scores.oneStar,
    scores.twoStars,
    scores.threeStars,
    scores.fourStars,
    scores.fiveStars,
  ];

  const sum = scoreList.reduce((acc, cur) => acc + cur, 0);
  return {
    totalCount: sum,
    scoreList: scoreList,
  };
};
