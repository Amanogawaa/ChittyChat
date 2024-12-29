import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import placeholder from "@/assets/bg.png";
import { useState } from "react";
import Gender from "./gender-box";
import useSignup from "@/hooks/useSignup";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { loading, error, signup } = useSignup();
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signup(inputs);
    console.log(result);
    if (result) {
      console.log("Signup successful!");
      toast.success("Signup successful!");
      navigate("/login");
    }
  };
  const handleCheck = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden min-h-[400px]  ">
        <CardContent className="p-0 flex justify-center items-center w-full">
          <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome Pips</h1>
                <p className="text-balance text-muted-foreground">
                  Create your Chitty Chat account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  id="fullname"
                  type="text"
                  required
                  value={inputs.fullname}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullname: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
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
                <Gender
                  onCheckbox={handleCheck}
                  selectedGender={inputs.gender}
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="passwordConfirm">Confirm Password</Label>
                </div>
                <Input
                  id="passwordConfirm"
                  type="password"
                  required
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
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
