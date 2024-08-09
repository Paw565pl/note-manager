/* eslint-disable @tanstack/query/exhaustive-deps */
import Note from "@/entities/note";
import apiService, { createAuthHeader } from "@/services/apiService";
import { QueryClient, useQuery } from "@tanstack/react-query";

const fetchNotes = async (accessToken: string) => {
  const { data } = await apiService.get<Note[]>("/notes", {
    headers: { Authorization: createAuthHeader(accessToken) },
  });
  return data;
};

export const notesQueryKey = ["notes"];

export const prefetchNotes = async (
  queryClient: QueryClient,
  accessToken: string,
) =>
  queryClient.prefetchQuery({
    queryKey: notesQueryKey,
    queryFn: () => fetchNotes(accessToken),
  });

const useFetchNotes = (accessToken: string) =>
  useQuery({
    queryKey: notesQueryKey,
    queryFn: () => fetchNotes(accessToken),
  });

export default useFetchNotes;
