<script lang="ts">
  import { marked } from 'marked';
  import type { NoteBlock } from './types';
  import { notes } from './store';
  import { format } from 'date-fns';

  export let note: NoteBlock;

  $: htmlContent = marked.parse(note.content);
  $: formattedDate = format(new Date(note.createdAt), 'HH:mm');
</script>

<div class="bg-white rounded-lg shadow-md p-4 mb-4">
  <div class="flex justify-between items-start mb-2">
    <div class="flex gap-2">
      {#each note.tags as tag}
        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          #{tag.name}
        </span>
      {/each}
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500">{formattedDate}</span>
      <button
        class="text-red-500 hover:text-red-700"
        on:click={() => notes.deleteNote(note.id)}
      >
        ×
      </button>
    </div>
  </div>
  <div class="prose prose-sm max-w-none">
    {@html htmlContent}
  </div>
</div>