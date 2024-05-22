"use client";

import useFetchNotes from "@/hooks/useFetchNotes";
import { useSession } from "next-auth/react";
import NoteAccordion from "../NoteAccordion";

const NotesGrid = () => {
  const { data: session } = useSession();
  const { data: notes } = useFetchNotes(session?.access_token!);

  return notes?.map((note) => <NoteAccordion key={note.id} note={note} />);
};

export default NotesGrid;
