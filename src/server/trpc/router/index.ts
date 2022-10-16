// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { productRouter } from "./product";

export const appRouter = t.router({
  auth: authRouter,
  products: productRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
