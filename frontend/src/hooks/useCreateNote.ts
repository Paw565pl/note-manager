import Note from "@/entites/note";
import { NoteValues } from "@/schemas/noteSchema";
import apiService, { createAuthHeader } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notesQueryKey } from "./useFetchNotes";

const createNote = async (newNote: NoteValues, accessToken: string) => {
  const { data } = await apiService.post<Note>("/notes", newNote, {
    headers: { Authorization: createAuthHeader(accessToken) },
  });
  return data;
};

const useCreateNote = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation<Note, AxiosError, NoteValues, Note[]>({
    mutationKey: ["createNote"],
    mutationFn: (newNote) => createNote(newNote, accessToken),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notesQueryKey }),
  });
};

export default useCreateNote;
