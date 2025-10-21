"use client";
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";
import { loginUser } from "../../../libs/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (data: any) => {
    const res = await loginUser(data.email, data.password);

    if (res.success) {
      toast.success("Logged in successfully");
      window.dispatchEvent(new Event("storage"));
      router.push("/");
    } else {
      toast.error(res.message || "Invalid credentials ❌");
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <AuthForm type="login" onSubmit={handleLogin} />
      <p className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/auth/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register
        </a>
      </p>
    </AuthLayout>
  );
}
