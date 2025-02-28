import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Signin = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-7 pt-4 h-screen">
      <h1 className="text-4xl font-semibold">Welcome, back! </h1>
      <form className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" className="formInput" name="email" />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          className="formInput"
        />
        <Button
          type="submit"
          className="font-medium mt-4 py-6 text-2xl text-secondary rounded-full"
        >
          Sign In
        </Button>
        <div className="mt-8">
          <Link
            href={"/auth/forgot-password"}
            className="text-primary text-lg hover:text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <p className="text-primary text-lg">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="underline text-blue-500 hover:text-blue-900"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Signin;
