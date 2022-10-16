import React, { FC } from "react";
import { Button, Navbar as Nav } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar: FC = () => {
  const { data: session } = useSession();
  return (
    <Nav fluid={true}>
      <Nav.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          AnonStore
        </span>
      </Nav.Brand>
      <div className="flex space-x-2 md:order-2">
        {session ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
        <Nav.Toggle />
      </div>
      <Nav.Collapse>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/">About</Nav.Link>
        <Nav.Link href="/">Services</Nav.Link>
        <Nav.Link href="/">Pricing</Nav.Link>
        {session?.user?.role == "admin" ? (
          <Nav.Link href="/admin">Admin</Nav.Link>
        ) : null}
      </Nav.Collapse>
    </Nav>
  );
};

export default Navbar;
