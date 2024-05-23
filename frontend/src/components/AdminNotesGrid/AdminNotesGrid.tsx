"use client";

import useAdminDeleteNote from "@/hooks/useAdminDeleteNote";
import useAdminFetchNotes from "@/hooks/useAdminFetchNotes";
import { useSession } from "next-auth/react";
import NoteAccordion from "../NoteAccordion";

const AdminNotesGrid = () => {
  const { data: session } = useSession();
  const { data: notes } = useAdminFetchNotes(session?.access_token!);
  const { mutate: adminDeleteNote } = useAdminDeleteNote(
    session?.access_token!
  );

  return notes?.map((note) => (
    <NoteAccordion
      key={note.id}
      note={note}
      showAuthor
      deleteHandler={adminDeleteNote}
    />
  ));
};

export default AdminNotesGrid;
