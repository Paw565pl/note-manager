"use client";

import Note from "@/entites/note";

interface NoteAccordionProps {
  note: Note;
  showAuthor?: boolean;
  deleteHandler: (noteId: number) => void;
}

const NoteAccordion = ({
  note: { id, title, text, created_at, user },
  showAuthor,
  deleteHandler,
}: NoteAccordionProps) => {
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    hour12: false,
  });

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        <span>{title}</span>
        {showAuthor && <span>Author: {user}</span>}
        <span className="text-xs" suppressHydrationWarning>
          {formattedDate}
        </span>
      </div>
      <div className="collapse-content space-y-2">
        <p>{text}</p>
        <button
          className="btn btn-outline btn-sm btn-error"
          onClick={() => deleteHandler(id)}
        >
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default NoteAccordion;
