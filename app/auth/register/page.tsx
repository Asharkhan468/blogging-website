'use client'
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Create an Account">
      <AuthForm
        type="register"
        onSubmit={(data:any) => {
          console.log("Register data:", data);
          
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
