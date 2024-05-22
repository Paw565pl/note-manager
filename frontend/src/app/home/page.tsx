import { auth } from "@/auth";
import NoteForm from "@/components/NoteForm";
import NotesGrid from "@/components/NotesGrid";
import { prefetchNotes } from "@/hooks/useFetchNotes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const queryClient = new QueryClient();
  await prefetchNotes(queryClient, session.access_token!);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="lg:w-1/2 mx-auto space-y-2">
        <NoteForm />
        <NotesGrid />
      </main>
    </HydrationBoundary>
  );
};

export default HomePage;
