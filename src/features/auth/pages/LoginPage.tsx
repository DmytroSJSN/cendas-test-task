import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <section className="w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-800 p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-zinc-100">Sign in</h1>
        <p className="mt-1 mb-6 text-sm text-zinc-400">
          Enter your name to continue.
        </p>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
