"use client";

import { useSession } from "next-auth/react";
import NoteAccordion from "../NoteAccordion";
import useAdminFetchNotes from "@/hooks/useAdminFetchNotes";

const AdminNotesGrid = () => {
  const { data: session } = useSession();
  const { data: notes } = useAdminFetchNotes(session?.access_token!);

  return notes?.map((note) => (
    <NoteAccordion key={note.id} note={note} showAuthor />
  ));
};

export default AdminNotesGrid;
