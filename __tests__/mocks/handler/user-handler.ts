import { http, HttpResponse } from "msw";
import { TEAM_ID_MAP, userFixtures } from "../../fixtures/user-fixture";
import { list } from "radashi";
import { gen } from "../../generator";
import { TEST_LOGIN_USER } from "@/constants/test";

const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";

export const userHandlers = [
  http.get(BASE_URL + "/:teamId/auths/user", ({ params }) => {
    const { teamId } = params;
    const safeTeamId = Array.isArray(teamId) ? teamId[0] : teamId;

    if (!teamId) {
      return HttpResponse.json([], { status: 400 });
    }

    const numericTeamId = TEAM_ID_MAP[safeTeamId];

    if (numericTeamId === undefined) {
      return HttpResponse.json(
        {
          code: "USER_NOT_FOUND",
          message: "사용자를 찾을 수 없습니다",
        },
        { status: 404 },
      );
    }

    const response = userFixtures.filter(
      (user) => user.teamId === numericTeamId,
    );

    return HttpResponse.json(response[1]);
  }),
  http.post(BASE_URL + "/:teamId/auths/signup", async ({ params, request }) => {
    const { teamId } = params;
    const safeTeamId = Array.isArray(teamId) ? teamId[0] : teamId;
    const data = (await request.json()) as {
      email: string;
      password: string;
      passwordCheck: string;
      name: string;
      companyName: string;
    };

    if (
      !teamId ||
      !data ||
      typeof data.email !== "string" ||
      typeof data.password !== "string" ||
      typeof data.passwordCheck !== "string" ||
      typeof data.name !== "string" ||
      typeof data.companyName !== "string"
    ) {
      return HttpResponse.json(
        { message: "요청 데이터가 유효하지 않습니다." },
        { status: 400 },
      );
    }

    const numericTeamId = TEAM_ID_MAP[safeTeamId];

    const newUser = list(0).map((i) => {
      return gen.user.instance({
        teamId: numericTeamId,
        id: i + 1,
        image: "/vercel.svg",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    userFixtures.push(newUser[0]);

    return HttpResponse.json(
      {
        message: "사용자 생성 성공",
      },
      { status: 201 },
    );
  }),
  http.post(BASE_URL + "/:teamId/auths/signin", async ({ params, request }) => {
    const { teamId } = params;
    const data = (await request.json()) as {
      email: string;
      password: string;
    };

    if (
      !teamId ||
      !data ||
      typeof data.email !== "string" ||
      typeof data.password !== "string"
    ) {
      return HttpResponse.json(
        { message: "요청 데이터가 유효하지 않습니다." },
        { status: 400 },
      );
    }

    const user = userFixtures.find((user) => user.email === data.email);

    if (!user) {
      return HttpResponse.json(
        { message: "존재하지 않는 아이디입니다." },
        { status: 404 },
      );
    }

    if (TEST_LOGIN_USER.password !== data.password) {
      return HttpResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      token: "jwt token",
    });
  }),
];
