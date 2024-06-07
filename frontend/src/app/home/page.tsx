import { auth, signIn } from "@/auth";
import AddNoteForm from "@/components/AddNoteForm";
import NotesGrid from "@/components/NotesGrid";
import { prefetchNotes } from "@/hooks/useFetchNotes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const HomePage = async () => {
  const session = await auth();
  if (!session) return signIn();

  const queryClient = new QueryClient();
  await prefetchNotes(queryClient, session.access_token!);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mx-auto space-y-2 lg:w-1/2">
        <AddNoteForm />
        <NotesGrid />
      </main>
    </HydrationBoundary>
  );
};

export default HomePage;
