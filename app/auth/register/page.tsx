'use client'
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";
import { registerUser } from "@/libs/api";
import toast from "react-hot-toast"; 


export default function RegisterPage() {
  const router = useRouter();
  const handleRegister = async (data: any) => {
    const res = await registerUser(data.email, data.password);

    if (res.success) {
      toast.success("Registered successfully");
      router.push("/");
    } else {
      toast.error(res.message );
    }
  };

  return (
    <AuthLayout title="Create an Account">
      <AuthForm
        type="register"
        onSubmit={(data:any) => {
          console.log("Register data:", data);
          handleRegister(data)
          
        }}
      />
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Log In
        </a>
      </p>
    </AuthLayout>
  );
}
