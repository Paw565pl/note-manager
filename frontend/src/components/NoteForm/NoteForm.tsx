"use client";

import noteSchema, { NoteValues } from "@/schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";

const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteValues>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit: SubmitHandler<NoteValues> = (formData) =>
    console.log(formData);

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

export default NoteForm;
