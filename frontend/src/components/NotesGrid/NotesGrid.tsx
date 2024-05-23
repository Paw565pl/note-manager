"use client";

import useDeleteNote from "@/hooks/useDeleteNote";
import useFetchNotes from "@/hooks/useFetchNotes";
import { useSession } from "next-auth/react";
import NoteAccordion from "../NoteAccordion";

const NotesGrid = () => {
  const { data: session } = useSession();
  const { data: notes } = useFetchNotes(session?.access_token!);
  const { mutate: deleteNote } = useDeleteNote(session?.access_token!);

  return notes?.map((note) => (
    <NoteAccordion
      key={note.id}
      note={note}
      deleteHandler={(id) => deleteNote(id)}
    />
  ));
};

export default NotesGrid;
