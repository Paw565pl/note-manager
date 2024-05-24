import { z } from "zod";

const noteSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(10, "Title must be at least 10 characters long")
    .max(100, "Title must be at most 100 characters long"),
  text: z.string({ required_error: "Text is required" }).trim(),
});

export type NoteValues = z.infer<typeof noteSchema>;

export default noteSchema;
