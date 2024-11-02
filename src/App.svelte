<script lang="ts">
  import NoteEditor from './lib/NoteEditor.svelte';
  import NoteBlock from './lib/NoteBlock.svelte';
  import { notes } from './lib/store';
</script>

<main class="min-h-screen bg-gray-100">
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Daily Notes</h1>
    
    <NoteEditor />
    
    <div class="space-y-4">
      {#each $notes as note (note.id)}
        <NoteBlock {note} />
      {/each}
    </div>
  </div>
</main>