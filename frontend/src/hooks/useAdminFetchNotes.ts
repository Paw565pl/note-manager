/* eslint-disable @tanstack/query/exhaustive-deps */
import Note from "@/entites/note";
import apiService, { createAuthHeader } from "@/services/apiService";
import { QueryClient, useQuery } from "@tanstack/react-query";

const adminFetchNotes = async (accessToken: string) => {
  const { data } = await apiService.get<Note[]>("/admin", {
    headers: { Authorization: createAuthHeader(accessToken) },
  });
  return data;
};

export const adminNotesQueryKey = ["adminNotes"];

export const adminPrefetchNotes = async (
  queryClient: QueryClient,
  accessToken: string,
) =>
  queryClient.prefetchQuery({
    queryKey: adminNotesQueryKey,
    queryFn: () => adminFetchNotes(accessToken),
  });

const useAdminFetchNotes = (accessToken: string) =>
  useQuery({
    queryKey: adminNotesQueryKey,
    queryFn: () => adminFetchNotes(accessToken),
  });

export default useAdminFetchNotes;
