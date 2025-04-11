
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="h-12 w-12 rounded-full bg-primary" />
          <h1 className="text-3xl font-bold">PulseCare</h1>
          <p className="text-muted-foreground">Smart Care Assistant for Clinics</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
