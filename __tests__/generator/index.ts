import { User } from "@/entity/user";
import { ReviewDetail } from "@/entity/review";
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

export const genReviews = {
  img: () => draw(imgPath) as string,
  reviewDetail: {
    instance: (partial?: Partial<ReviewDetail>): ReviewDetail => ({
      teamId: 0,
      id: faker.number.int(),
      score: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      createdAt: faker.date.past().toISOString(),
      Gathering: {
        teamId: 0,
        id: faker.number.int(),
        type: faker.helpers.arrayElement([
          "DALLAEMFIT",
          "MINDFULLNESS",
          "WORKATION",
        ]),
        name: faker.company.name(),
        dateTime: faker.date.future().toISOString(),
        location: faker.location.city(),
        image: "/image/alt-place.jpg",
      },
      User: {
        teamId: faker.number.int(),
        id: faker.number.int(),
        name: faker.person.fullName(),
        image: draw(imgPath) as string,
      },
      ...partial,
    }),
  },
};
