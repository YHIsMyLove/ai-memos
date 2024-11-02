export interface NoteBlock {
  id: string;
  content: string;
  createdAt: Date;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}