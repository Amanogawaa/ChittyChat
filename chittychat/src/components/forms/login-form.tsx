import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import placeholder from "@/assets/bg.png";
import { useState } from "react";
import { useAuth } from "@/context/authContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, loading } = useAuth();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(inputs.username, inputs.password);
    if (result) {
      navigate("/home");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="overflow-hidden min-h-[400px]  flex justify-center items-center">
        <CardContent
          className="p-0 h-full flex justify-center items-center w-full"
          onSubmit={handleSubmit}
        >
          <form className="p-6 md:p-8 w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Chitty Chat account
                </p>
              </div>

              <div className="grid gap-2 w-full">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
