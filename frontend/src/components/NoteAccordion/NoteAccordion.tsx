"use client";

interface NoteAccordionProps {
  title: string;
  text: string;
  created_at: string;
}

const NoteAccordion = ({ title, text, created_at }: NoteAccordionProps) => {
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
      <div className="collapse-content">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default NoteAccordion;
