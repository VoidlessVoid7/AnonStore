import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query
  const { data: product, isLoading } = trpc.products.getProductByID.useQuery({ id: productId as string })

  if (isLoading) {
    return <div className="m-12">Loading...</div>
  }

  return <div className="m-12">{product?.name}</div>;
};

export default ProductDetail;
