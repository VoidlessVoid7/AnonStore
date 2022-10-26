import React, { FC } from "react";
import { Button, Navbar as Nav } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { cartState } from "../redux/cartSlice";
import { useRouter } from "next/router";

const Navbar: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const cart = useSelector((state: cartState) => state.cart);
  return (
    <Nav fluid={true}>
      <div className="cursor-pointer">
        <Nav.Brand onClick={() => router.push("/")}>
          <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            AnonStore
          </span>
        </Nav.Brand>
      </div>
      <div className="flex items-center space-x-2 md:order-2">
        <ShoppingBagIcon
          className="mr-1 h-7 w-7 cursor-pointer"
          onClick={() => router.push("/cart")}
        />
        <div className="bg-gray-800 text-gray-200 px-[0.55rem] rounded-2xl font-medium">{cart.length}</div>
        <div className="pl-3">
          {session ? (
            <Button color="light" onClick={() => signOut()}>
              <p className="font-semibold">LOGOUT</p>
            </Button>
          ) : (
            <Button color="light" onClick={() => signIn()}>
              <p className="font-semibold">LOGIN</p>
            </Button>
          )}
        </div>
        <Nav.Toggle />
      </div>
      <Nav.Collapse>
        <div className="cursor-pointer">
          <Nav.Link onClick={() => router.push("/")}>Home</Nav.Link>
        </div>
        <div className="cursor-pointer">
          <Nav.Link onClick={() => router.push("/")}>About</Nav.Link>
        </div>
        <div className="cursor-pointer">
          <Nav.Link onClick={() => router.push("/")}>Services</Nav.Link>
        </div>
        <div className="cursor-pointer">
          <Nav.Link onClick={() => router.push("/")}>Pricing</Nav.Link>
        </div>
        {session?.user?.role == "admin" ? (
          <div className="cursor-pointer">
            <Nav.Link onClick={() => router.push("/admin")}>Admin</Nav.Link>
          </div>
        ) : null}
      </Nav.Collapse>
    </Nav>
  );
};

export default Navbar;
