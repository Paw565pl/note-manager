"use client";

import Note from "@/entites/note";
import useDeleteNote from "@/hooks/useDeleteNote";
import { useSession } from "next-auth/react";

interface NoteAccordionProps {
  note: Note;
}

const NoteAccordion = ({
  note: { id, title, text, created_at },
}: NoteAccordionProps) => {
  const { data: session } = useSession();
  const { mutate: deleteNote } = useDeleteNote(session?.access_token!);

  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    hour12: false,
  });

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        <span>{title}</span>
        <span className="text-xs" suppressHydrationWarning>
          {formattedDate}
        </span>
      </div>
      <div className="collapse-content space-y-2">
        <p>{text}</p>
        <button
          className="btn btn-outline btn-sm btn-error"
          onClick={() => deleteNote(id)}
        >
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default NoteAccordion;
