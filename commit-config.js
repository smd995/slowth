export default {
  prompter: (cz, commit) => {
    const typeChoices = [
      { value: "feature", name: "feature:     ✨ 새로운 기능 추가" },
      { value: "fix", name: "fix:      🐛 버그 수정" },
      { value: "docs", name: "docs:     📝 문서 수정 (README 등)" },
      { value: "style", name: "style:    💄 코드 포맷팅 (세미콜론 등)" },
      { value: "refactor", name: "refactor:♻️  리팩토링 (기능 변경 없음)" },
      { value: "perf", name: "perf:     ⚡️ 성능 개선" },
      { value: "test", name: "test:     ✅ 테스트 코드 추가/수정" },
      { value: "build", name: "build:    🛠️  빌드 시스템 변경 (webpack 등)" },
      { value: "ci", name: "ci:       🤖 CI 설정/스크립트 변경" },
      { value: "chore", name: "chore:    🔧 기타 변경사항 (빌드 제외)" },
      { value: "revert", name: "revert:   ⏪ 이전 커밋 되돌리기" },
    ];

    const questions = [
      {
        type: "list",
        name: "type",
        message: "1️⃣ 커밋 유형을 선택하세요:",
        choices: typeChoices,
      },
      {
        type: "input",
        name: "subject",
        message: "2️⃣ 커밋 메시지를 입력하세요:",
        validate: (input) => input.length > 0 && input.length <= 100,
      },
      {
        type: "input",
        name: "ticketNumber",
        message: "3️⃣ 이슈 번호를 입력하세요 (숫자만):",
        validate: (input) => /^\d+$/.test(input),
      },
    ];

    cz.prompt(questions).then((answers) => {
      const { type, subject, ticketNumber } = answers;
      const message = `${type}: ${subject} (#${ticketNumber})`;

      const divider = "=".repeat(50);
      const decoratedMessage = `
${divider}
✅ 커밋 메시지가 다음과 같아요! 커밋할까요?

${message}

${divider}
`;

      cz.prompt([
        {
          type: "confirm",
          name: "confirmCommit",
          message: decoratedMessage,
          default: false,
        },
      ]).then((confirmAnswer) => {
        if (confirmAnswer.confirmCommit) {
          commit(message);
        } else {
          console.log("❌ 커밋이 취소되었습니다.");
        }
      });
    });
  },
};
