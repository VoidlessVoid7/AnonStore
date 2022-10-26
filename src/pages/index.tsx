import type { NextPage } from "next";
import { createProxySSGHelpers } from '@trpc/react/ssg'
import Product from "../components/Product";
import { Product as ProductModel } from 'prisma/prisma-client'
import { appRouter } from "../server/trpc/router";
import superjson from 'superjson';
import { prisma } from '../server/db/client'

interface Props {
  products: ProductModel[]
}

const Home: NextPage<Props> = ({ products }) => {
  return (
    <div className="m-12">
      <div className="md:grid lg:grid-cols-4 md:grid-cols-3 gap-20">
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma: prisma } as never,
    transformer: superjson
  })
  const products = await ssg.products.getAllProducts.fetch()
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Home;
