import { list } from "radashi";
import { gen } from "../generator";
import { objectToString } from "../libs/object-to-string";

const main = (len: number) => {
  const instance = list(0, len - 1).map((i) => {
    return gen.user.instance({ id: i });
  });

  const str = objectToString(instance);

  console.log(str);
};

main(20);
