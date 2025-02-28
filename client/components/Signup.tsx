import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 gap-4">
      <span className="text-primary text-4xl">Logo</span>
      <h1 className="text-5xl font-serif text-primary italic">
        Create Account
      </h1>
      <form className="flex flex-col gap-4 ">
        <label htmlFor="name">Your Name</label>
        <Input id="name" className="formInput" name="name" placeholder="name" />
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          className="formInput"
        />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder=""
          className="formInput"
        />
        <p className="text-gray-400 ">
          Password must be at least 8 characters.
        </p>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder=""
          className="formInput"
        />
        <Button className="rounded-full py-6 mt-5 bg-primary text-secondary font-semibold text-xl">
          Create Account
        </Button>
        <p className="text-primary font-medium text-lg">
          Already have an account?{" "}
          <Link href="#" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
