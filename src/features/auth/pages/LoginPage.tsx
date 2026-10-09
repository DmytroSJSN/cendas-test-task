import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <section className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Enter your name to continue.
        </p>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
