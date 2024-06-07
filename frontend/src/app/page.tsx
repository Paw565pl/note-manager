import { auth, providerMap, signIn } from "@/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();
  if (session) return redirect("/home");

  return (
    <main className="space-y-3 text-center">
      <h1 className="text-5xl">Welcome!</h1>
      <h2 className="text-2xl">To continue you have to sign in.</h2>
      <div className="flex flex-col gap-2">
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/home" });
            }}
          >
            <button type="submit" className="btn btn-primary">
              <span>Sign in with {provider.name}</span>
            </button>
          </form>
        ))}
      </div>
    </main>
  );
};

export default SignInPage;
