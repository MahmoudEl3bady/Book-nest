import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-blue-500 flex items-center justify-between pt-5">
      <Input placeholder="Search" />
      <nav>
        <ul className="flex">
          <li className="mr-4">
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
      <Button>Sign In</Button>
    </header>
  );
};
export default Header;
