import Note from "@/entities/note";
import apiService, { createAuthHeader } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { adminNotesQueryKey } from "./useAdminFetchNotes";
import { notesQueryKey } from "./useFetchNotes";

const adminDeleteNote = async (id: number, accessToken: string) => {
  const response = await apiService.delete(`/admin/${id}`, {
    headers: { Authorization: createAuthHeader(accessToken) },
  });
  return response;
};

const useAdminDeleteNote = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, number, Note[]>({
    mutationKey: ["deleteNote"],
    mutationFn: (id) => adminDeleteNote(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminNotesQueryKey });
      queryClient.invalidateQueries({ queryKey: notesQueryKey });
    },
  });
};

export default useAdminDeleteNote;
