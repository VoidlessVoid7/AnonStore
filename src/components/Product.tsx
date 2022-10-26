import { Product } from "@prisma/client";
import { Button } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

type Props = {
  product: Product;
};

const Product = ({ product }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="mb-12 border border-gray-200 p-8 hover:border-gray-400">
      <Image
        src={product.image as string}
        alt={product.name}
        className="-mt-3 cursor-pointer hover:scale-105 hover:transition hover:delay-75 hover:ease-in-out"
        width={1000}
        height={1000}
        objectFit={"contain"}
        onClick={() => router.push(`/products/${product.id}`)}
      />
      <div className="mt-4 flex items-center justify-between">
        <h5
          className="cursor-pointer text-md text-gray-700"
          onClick={() => router.push(`/products/${product.id}`)}
        >
          {product.name}
        </h5>
        <p className="text-xs uppercase tracking-wide">
          {product.quantity} IN STOCK
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between font-medium">
        <p>${product.price}</p>
        <span>
          <Button color="light" onClick={() => handleAddToCart(product)}>
            <p className="font-semibold">ADD</p>
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Product;
