type SignupProps = {
  fullname: string;
  username: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

export function validateSignup({
  fullname,
  username,
  gender,
  password,
  confirmPassword,
}: SignupProps) {
  if (!fullname || !username || !gender || !password || !confirmPassword) {
    return { success: false, error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters long",
    };
  }

  const validateGender = ["male", "female"];
  if (!validateGender.includes(gender)) {
    return { success: false, error: "Invalid gender selection" };
  }

  return { success: true };
}
