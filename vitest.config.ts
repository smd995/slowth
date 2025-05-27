import { defineConfig } from "vitest/config";
import path from "path"; // 경로 설정 위해 필요

const testEnv = {
  NODE_ENV: "test" as const,
  NEXT_PUBLIC_API_URL: "https://fe-adv-project-together-dallaem.vercel.app",
};

export default defineConfig({
  esbuild: {
    jsx: "automatic", // React 17+ JSX 자동 import 설정
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom", // 반드시 있어야 함!
    env: testEnv,
  },
});
