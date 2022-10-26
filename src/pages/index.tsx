import type { NextPage } from "next";
import Product from "../components/Product";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: products, isLoading } = trpc.products.getAllProducts.useQuery();

  if (isLoading) {
    return <div className="m-12">Loading...</div>
  }

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

export default Home;
