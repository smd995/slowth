// Gathering(모임) 전체 타입
export interface Gathering {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
}

// 참석한 모임
export interface JoinedGathering extends Gathering {
  joinedAt: string | null;
  isCompleted: boolean;
  isReviewed: boolean;
}
