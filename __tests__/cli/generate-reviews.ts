import { list } from "radashi";
import { genReviews } from "../generator";
import { objectToString } from "../libs/object-to-string";

const createReview = (len: number) => {
  const instance = list(0, len - 1).map(() => {
    return genReviews.reviewDetail.instance({
      Gathering: {
        dateTime: "2025-05-21T09:06:50.733Z",
        id: 123,
        image: "/image/alt-place.jpg",
        location: "을지로 3가",
        name: "달램핏 오피스 스트레칭",
        teamId: 5,
        type: "DALLEMFIT",
      },
    });
  });

  const str = objectToString(instance);

  console.log(str);
};

createReview(50);
