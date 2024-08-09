import { UUID } from "crypto";

interface Note {
  title: string;
  text: string;
  id: number;
  user: string;
  user_id: UUID;
  created_at: string;
}

export default Note;
