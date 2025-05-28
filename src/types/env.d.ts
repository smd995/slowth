// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production";
    NEXT_PUBLIC_API_URL: string;
  }
}
