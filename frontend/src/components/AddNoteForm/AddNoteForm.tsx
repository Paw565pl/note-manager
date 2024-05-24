"use client";

import useCreateNote from "@/hooks/useCreateNote";
import noteSchema, { NoteValues } from "@/schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";

const AddNoteForm = () => {
  const { data: session } = useSession();
  const { mutate } = useCreateNote(session?.access_token!);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteValues>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit: SubmitHandler<NoteValues> = (formData) => {
    mutate(formData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section>
      <header className="text-2xl text-center">Add new note</header>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Title"
          register={register("title")}
          error={errors.title}
        />
        <FormTextArea
          label="Text"
          register={register("text")}
          error={errors.text}
        />
        <div className="flex justify-center py-2">
          <button type="submit" className="btn btn-accent btn-wide">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddNoteForm;
