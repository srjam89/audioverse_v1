import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div></div>
      <div className="glass_card col-span-1 p-4 rounded-lg">
        <h1 className="text-lg font-semibold text-center mb-6 mt-4">
          Welcome Back
        </h1>
        <div className="flex flex-col gap-4 sm:w-4/6 md:w-3/6 lg:w-3/6 mx-auto">
          <Input className="mb-4" type="email" placeholder="Email" />
          <Input className="mb-4" type="password" placeholder="Password" />
          <Button>Login</Button>
          <small className="text-center text-sm text-gray-500 my-4">
            Forgot password?{" "}
            <Link to="/forgot-password" className="text-(--accent)">
              Reset password
            </Link>
          </small>
          <hr className="mb-4" />
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-(--accent)">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
