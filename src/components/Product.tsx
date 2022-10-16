import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  product: Product;
};

const Product = ({ product }: Props) => {
  return (
    <a href="#">
      <Image
        src={product.image as string}
        alt={product.name}
        className="-mt-3 "
        width={1000}
        height={1000}
         objectFit={'contain'}
      />

      <h5 className="mt-4 text-sm text-gray-700">{product.name}</h5>

      <div className="mt-4 flex items-center justify-between font-medium">
        <p>${product.price}</p>

        <p className="text-xs uppercase tracking-wide">
          {product.quantity} IN STOCK
        </p>
      </div>
    </a>
  );
};

export default Product;
