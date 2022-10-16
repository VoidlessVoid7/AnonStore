import { t, adminProcedure } from "../trpc";
import { z } from "zod";

export const productRouter = t.router({
  createProduct: adminProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullable(),
        hidden: z.boolean(),
        image: z.string().nullable(),
        price: z.number().nullable(),
        quantity: z.number().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          hidden: input.hidden,
          image: input.image,
          price: input.price,
          quantity: input.quantity
        },
      });
      return product;
    }),
  getAllProducts: t.procedure
    .query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany();
  }),
});
