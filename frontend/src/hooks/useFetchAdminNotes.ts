/* eslint-disable @tanstack/query/exhaustive-deps */
import Note from "@/entites/note";
import apiService, { createAuthHeader } from "@/services/apiService";
import { QueryClient, useQuery } from "@tanstack/react-query";

const fetchAdminNotes = async (accessToken: string) => {
  const { data } = await apiService.get<Note[]>("/admin", {
    headers: { Authorization: createAuthHeader(accessToken) },
  });
  return data;
};

export const adminNotesQueryKey = ["adminNotes"];

export const prefetchAdminNotes = async (
  queryClient: QueryClient,
  accessToken: string
) =>
  queryClient.prefetchQuery({
    queryKey: adminNotesQueryKey,
    queryFn: () => fetchAdminNotes(accessToken),
  });

const useFetchAdminNotes = (accessToken: string) =>
  useQuery({
    queryKey: adminNotesQueryKey,
    queryFn: () => fetchAdminNotes(accessToken),
  });

export default useFetchAdminNotes;
