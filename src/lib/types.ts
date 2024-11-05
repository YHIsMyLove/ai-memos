export interface NoteBlock {
  id: string;
  content: string;
  createdAt: Date;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  noteCount: number;
}

export interface NoteStatistics {
  date: Date;
  count: number;
}