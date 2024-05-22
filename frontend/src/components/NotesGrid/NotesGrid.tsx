"use client";

import useFetchNotes from "@/hooks/useFetchNotes";
import { useSession } from "next-auth/react";
import NoteAccordion from "../NoteAccordion";

const NotesGrid = () => {
  const { data: session } = useSession();
  const { data: notes } = useFetchNotes(session?.access_token!);

  return notes?.map((note) => (
    <NoteAccordion
      key={note.id}
      title={note.title}
      text={note.text}
      created_at={note.created_at}
    />
  ));
};

export default NotesGrid;
