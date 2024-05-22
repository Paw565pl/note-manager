import { auth } from "@/auth";
import NoteForm from "@/components/NoteForm/NoteForm";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <main className="lg:w-1/2 mx-auto">
      <NoteForm />
    </main>
  );
};

export default HomePage;
