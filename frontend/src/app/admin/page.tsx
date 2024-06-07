import { auth, checkIsAdmin, signIn } from "@/auth";
import AdminNotesGrid from "@/components/AdminNotesGrid";
import { prefetchAdminNotes } from "@/hooks/useAdminFetchNotes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AdminPage = async () => {
  const session = await auth();
  if (!session) return signIn();

  const isAdmin = checkIsAdmin(session);
  if (!isAdmin)
    return (
      <p className="text-error">
        Forbbiden! You do not have permissions to be here. This page requires
        admin role.
      </p>
    );

  const queryClient = new QueryClient();
  await prefetchAdminNotes(queryClient, session.access_token!);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mx-auto space-y-2 lg:w-1/2">
        <AdminNotesGrid />
      </main>
    </HydrationBoundary>
  );
};

export default AdminPage;
