import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mx-auto p-4 bg-gray-200 flex justify-between items-center">
      <Link href="/">
        <span className="text-3xl font-mono tracking-widest first-letter:text-blue-900 first-letter:font-bold first-letter:text-4xl text-primary italic shadow-sm">
          BookNest
        </span>
      </Link>
      <button className="bg-transparent">
        <Menu size={30} />
      </button>
    </header>
  );
};
export default Header;
