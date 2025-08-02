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

// 모임 생성 폼 데이터
export interface GatheringFormData {
  name: string;
  location: "건대입구" | "을지로3가" | "신림" | "홍대입구";
  dateTime: string;
  registrationEnd: string;
  image: FileList | null;
  type: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  capacity: number | null;
}
