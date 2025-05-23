"use client";

import { User } from "@/entity/user";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://localhost:3000/user");
      const data = await response.json();
      setUsers(data);
    };
    fetchPosts();
  }, []);

  if (users.length === 0)
    return (
      <div className="mt-30 min-h-screen text-center text-6xl font-semibold text-blue-600">
        MSW 테스트하기
      </div>
    );

  return (
    <>
      <div className="mt-30 text-center text-6xl font-semibold text-blue-600">
        MSW 테스트하기
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.id}</span> <span>{user.email}</span>
              <span>{user.name}</span> <span>{user.companyName}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
