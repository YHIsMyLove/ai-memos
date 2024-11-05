import { writable, derived } from 'svelte/store';
import type { NoteBlock, NoteStatistics, Tag } from './types';
import { format, isToday, parseISO } from 'date-fns';

function extractTags(content: string): string[] {
  const tagRegex = /#(\w+)/g;
  const matches = content.match(tagRegex);
  return matches ? matches.map(tag => tag.slice(1)) : [];
}

/**
 * 笔记相关API
 * @returns 
 */
function createNoteStore() {
  const { subscribe, set, update } = writable<NoteBlock[]>([]);

  /**
   * 根据日期查询笔记
   * @param date 
   * @returns 
   */
  async function fetchNotes(date?: Date) {
    const dateObj = date || new Date()
    const response = await fetch(`http://localhost:3000/notes?date=${dateObj.toLocaleDateString('en-CA')}`);//
    const note = await response.json();
    set(note);
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
        await fetchNotes()
      }
    },
    deleteNote: async (id: string) => {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        update(notes => notes.filter(note => note.id !== id));
        await fetchNotes()
      }
    },
    fetchNotes,
  };
}

/**
 * 笔记统计
 * @returns 
 */
function noteStatistics() {
  const { subscribe, set } = writable<NoteStatistics[]>([]);
  async function countNotesByMonth(date?: Date) {
    date = date || new Date();
    const response = await fetch(`http://localhost:3000/notes/countNotesByMonth?date=${date?.toLocaleDateString('en-CA')}`);
    const data = await response.json();
    set(data);
  }
  async function countNotesByWeek(date?: Date) {
    date = date || new Date();
    const response = await fetch(`http://localhost:3000/notes/countNotesByWeek?date=${date?.toLocaleDateString('en-CA')}`);
    const data = await response.json();
    set(data);
  }
  return {
    subscribe,
    countNotesByMonth,
    countNotesByWeek
  }
}

/**
 * 标签相关API
 * @returns 
 */
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

/**
 * 备份相关API
 */
function backUp() {
  function startBackup() {

  }
}

/**
 * 当前的月份
 */
export let globalCurrentDate = writable(new Date());
/**
 * 当前的日期
 */
export let globalCurrentDay = writable(new Date());
export const notes = createNoteStore();
export const tags = createTagStore();
export const statistics = noteStatistics();

// Initialize data
notes.fetchNotes();
tags.fetchTags();

globalCurrentDay.subscribe(date => {
  notes.fetchNotes(date);
})
globalCurrentDate.subscribe(date => {
  notes.fetchNotes(date);
  statistics.countNotesByMonth(date);
  // statistics.subscribe(stats => {
  //   if (date.getDay() === 1) {
  //     let hasDate = false;
  //     let index = 0;
  //     let current = stats[index];
  //     while (current.count === 0 && index < stats.length - 1) {
  //       current = stats[++index];
  //       hasDate = true;
  //     }
  //     if (hasDate) {
  //       globalCurrentDate.set(new Date(current.date));
  //     }
  //   }
  // })
})