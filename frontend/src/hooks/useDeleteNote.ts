import Note from "@/entites/note";
import apiService, { createAuthHeader } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { notesQueryKey } from "./useFetchNotes";

const deleteNote = async (id: number, accessToken: string) => {
  const response = await apiService.delete(`/notes/${id}`, {
    headers: { Authorization: createAuthHeader(accessToken) },
  });
  return response;
};

const useDeleteNote = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, number, Note[]>({
    mutationKey: ["deleteNote"],
    mutationFn: (id) => deleteNote(id, accessToken),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notesQueryKey }),
  });
};

export default useDeleteNote;
