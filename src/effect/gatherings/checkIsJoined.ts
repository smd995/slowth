import { JoinedGathering } from "@/entity/gathering";
import { getJoinedGatherings } from "./getJoinedGatherings";

export const checkIsJoined = async (gatheringId: number) => {
  try {
    const joinedGatheringList: JoinedGathering[] = await getJoinedGatherings(
      {},
    );

    return joinedGatheringList?.some(
      (gathering) => gathering.id === gatheringId,
    );
  } catch (error) {
    console.error("checkIsJoined 진행 중 오류 발생:", error);
    return false;
  }
};
