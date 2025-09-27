'use client'
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back">
      <AuthForm
        type="login"
        onSubmit={(data:any) => {
          console.log("Login data:", data);
          // TODO: integrate Firebase/Auth API
        }}
      />
      <p className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register
        </a>
      </p>
    </AuthLayout>
  );
}
