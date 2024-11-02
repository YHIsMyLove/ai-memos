import { writable, derived } from 'svelte/store';
import type { NoteBlock, Tag } from './types';
import { format, isToday, parseISO } from 'date-fns';

function extractTags(content: string): string[] {
  const tagRegex = /#(\w+)/g;
  const matches = content.match(tagRegex);
  return matches ? matches.map(tag => tag.slice(1)) : [];
}

function createNoteStore() {
  const { subscribe, set, update } = writable<NoteBlock[]>([]);
  
  async function fetchNotes() {
    const response = await fetch('http://localhost:3000/notes');
    const notes = await response.json();
    const todayNotes = notes.filter(note => isToday(parseISO(note.createdAt)));
    set(todayNotes);
  }

  return {
    subscribe,
    addNote: async (content: string) => {
      const extractedTags = extractTags(content);
      const todayTag = format(new Date(), 'yyyy-MM-dd');
      const tags = [...new Set([...extractedTags, todayTag])];

      const response = await fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, tags })
      });
      
      if (response.ok) {
        const newNote = await response.json();
        update(notes => [...notes, newNote]);
      }
    },
    deleteNote: async (id: string) => {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        update(notes => notes.filter(note => note.id !== id));
      }
    },
    fetchNotes
  };
}

function createTagStore() {
  const { subscribe, set } = writable<Tag[]>([]);
  
  async function fetchTags() {
    const response = await fetch('http://localhost:3000/tags');
    const tags = await response.json();
    set(tags);
  }

  return {
    subscribe,
    fetchTags
  };
}

export const notes = createNoteStore();
export const tags = createTagStore();

// Initialize data
notes.fetchNotes();
tags.fetchTags();