"use client";

import useFetchAdminNotes from "@/hooks/useFetchAdminNotes";
import { useSession } from "next-auth/react";
import NoteAccordion from "../NoteAccordion";

const AdminNotesGrid = () => {
  const { data: session } = useSession();
  const { data: notes } = useFetchAdminNotes(session?.access_token!);

  return notes?.map((note) => (
    <NoteAccordion key={note.id} note={note} showAuthor />
  ));
};

export default AdminNotesGrid;
