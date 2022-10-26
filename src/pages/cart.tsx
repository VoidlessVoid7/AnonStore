import { Button } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { cartState } from "../redux/cartSlice";
import { calculateBaseTotal } from "../utils/cartHelper";

const TAX_RATE = 0.18

const Cart = () => {
  const cart = useSelector((state: cartState) => state.cart);
  const { data: session } = useSession();
  const basePriceTotal = useMemo(() => calculateBaseTotal(cart), [cart])

  if (!session) {
    return (
      <div className="mt-72 text-center">
        <h1 className="text-3xl">Please login to access your cart</h1>
        <div className="mt-12 ml-[48%] flex w-20 justify-center">
          <Button color="light" onClick={() => signIn()}>
            LOGIN
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {cart.length > 0 ? (
        <div className="m-6 md:space-x-6 space-y-6 md:m-12 md:flex md:space-y-0">
          <div className="flex w-full flex-col space-y-8 md:w-7/12">
            {cart.map((cartItem) => (
              <CartItem key={cartItem.product.id} cartProduct={cartItem} />
            ))}
          </div>
          <div className="flex w-full flex-col border border-gray-300 p-5 md:w-5/12">
            <p className="mb-8 text-2xl font-semibold">Your Bill</p>
            <div className="mx-4 flex justify-between pb-6 border-b">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Base Price</p>
                <p className="mt-8 text-lg font-semibold">Taxes</p>
                <p className="mt-14 text-lg font-semibold">
                  Grand Total
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-light">${basePriceTotal}</p>
                <p className="mt-8 text-lg font-light">${TAX_RATE * basePriceTotal}</p>
                <p className="mt-14  text-lg font-light">${basePriceTotal +  TAX_RATE * basePriceTotal}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-72 text-center">
          <h1 className="text-3xl">Your cart is empty</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
