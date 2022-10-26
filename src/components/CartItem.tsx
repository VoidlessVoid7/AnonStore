import { Button } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { CartProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/cartSlice";

type Props = {
  cartProduct: CartProduct;
};

const CartItem = ({ cartProduct }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="flex space-x-6 border border-gray-300 p-2">
      <Image
        src={cartProduct.product.image as string}
        width={250}
        height={250}
        objectFit={"contain"}
        alt={cartProduct.product.name}
      />
      <div className="mb-4 mt-4 flex flex-col justify-between pr-4 last:w-full">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">{cartProduct.product.name}</p>
          <p className="font-sm text-lg text-gray-600">
            x{cartProduct.quantity}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-sm text-xl text-gray-700">
            ${(cartProduct.product.price as number) * cartProduct.quantity}
          </p>
          <div className="flex space-x-4">
            <div className="">
              <Button
                onClick={() =>
                  dispatch(incrementQuantity(cartProduct.product.id))
                }
                color="light"
              >
                <p className="font-mono text-sm">+</p>
              </Button>
            </div>
            <div className="">
              <Button
                onClick={() =>
                  dispatch(decrementQuantity(cartProduct.product.id))
                }
                color="light"
              >
                <p className="font-mono text-sm">-</p>
              </Button>
            </div>
            <div className="">
              <Button
                onClick={() => dispatch(removeItem(cartProduct.product.id))}
                color="light"
              >
                <p className="font-mono text-sm">x</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
