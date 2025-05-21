export default {
  rules: {
    // type은 필수이며, 아래 목록 중 하나여야 함
    "type-enum": [
      2,
      "always",
      [
        "feature", // 새로운 기능
        "fix", // 버그 수정
        "docs", // 문서 수정
        "style", // 코드 포맷팅 (기능 변경 없음)
        "refactor", // 리팩토링
        "test", // 테스트 코드
        "chore", // 빌드/도구/패키지 등 작업
      ],
    ],
    // type은 반드시 있어야 함
    "type-empty": [2, "never"],
    // subject는 반드시 있어야 함
    "subject-empty": [2, "never"],
    // 헤더 최대 길이 제한 (72자 권장)
    "header-max-length": [2, "always", 72],
    // 소문자로 시작하도록 강제
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
  },
  extends: ["@commitlint/config-conventional"],
};
