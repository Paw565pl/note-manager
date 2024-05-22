import { auth } from "@/auth";
import NoteAccordion from "@/components/NoteAccordion/NoteAccordion";
import NoteForm from "@/components/NoteForm/NoteForm";
import Note from "@/entites/note";
import apiService from "@/services/apiService";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const { data: notes } = await apiService.get<Note[]>("/notes");

  return (
    <main className="lg:w-1/2 mx-auto space-y-2">
      <NoteForm />
      {notes.map((note) => (
        <NoteAccordion
          key={note.id}
          title={note.title}
          text={note.text}
          created_at={note.created_at}
        />
      ))}
    </main>
  );
};

export default HomePage;
