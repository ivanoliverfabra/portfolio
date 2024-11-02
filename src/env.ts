import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SMTP_HOST: z.string(),
    SMTP_PORT: z.number(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_EMAIL: z.string(),
    VITE_GITHUB: z.string(),
    VITE_LINKEDIN: z.string(),
    VITE_DISCORD: z.string(),
    VITE_NUMBER: z.string(),
  },
  runtimeEnv: import.meta.env,
});
