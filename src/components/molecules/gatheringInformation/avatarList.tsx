import { Avatar } from "@/components/atom/avatar";
import { useEffect, useState } from "react";

// User 타입은 추후 api 응답 결과에 맞게 변경 예정입니다.
export type User = {
  id: number;
  name: string;
  image?: string;
};

interface AvartarListProps {
  UserList: User[];
}

export const AvartarList = ({ UserList }: AvartarListProps) => {
  const [displayUserList, setDisaplayUserList] = useState(UserList); // 프로필 사진이 보여지는 사용자 리스트
  const [overNumber, setOverNumber] = useState(0); // 5명 이상일 경우, 숫자로 표기되는 인원 수
  useEffect(() => {
    if (UserList.length > 5) {
      setDisaplayUserList(UserList.slice(0, 4));
      setOverNumber(UserList.length - 4);
    }
  }, [UserList]);

  return (
    <div className="flex -space-x-2.5">
      {displayUserList.map((user) => (
        <Avatar
          key={user.id}
          username={user.name}
          className="h-[30px] w-[30px]"
          src={user.image}
        />
      ))}

      {/* 5명 이상일 경우, 숫자로 표기되는 인원 수  */}
      {UserList.length > 5 && (
        <div className="bg-secondary-100 text-secondary-800 flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm font-semibold">
          +{overNumber}
        </div>
      )}
    </div>
  );
};
