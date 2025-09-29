import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  prisma,
});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const postRouter = t.router({
  list: t.procedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  create: t.procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),
});

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return 'Hello from tRPC!';
  }),
  post: postRouter,
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
