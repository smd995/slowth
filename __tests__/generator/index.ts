import { User } from "@/entity/user";
import { faker } from "@faker-js/faker";

import { draw } from "radashi";

export const imgPath = [
  "/file.svg",
  "/globe.svg",
  "/vercel.svg",
  "/window.svg",
];

export const gen = {
  img: () => draw(imgPath) as string,
  user: {
    instance: (partial?: Partial<User>): User => ({
      teamId: 0,
      id: faker.number.int(),
      email: faker.person.lastName() + "@gmail.com",
      name: faker.person.firstName(),
      companyName: faker.company.name(),
      image: gen.img(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      ...partial,
    }),
  },
};
