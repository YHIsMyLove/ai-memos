<script lang="ts">
  import NoteEditor from "./lib/NoteEditor.svelte";
  import NoteBlock from "./lib/NoteBlock.svelte";
  import { notes } from "./lib/store";
  import Settings from "./lib/Settings.svelte";
  import GithubCalendar from "./lib/GithubCalendar.svelte";
  import type { NoteStatistics } from "./lib/types";
  let editing = false;
</script>

<div class="min-h-screen bg-primary overflow-hidden drawer drawer-end">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <div class="container mx-auto px-4 max-w-3xl">
      <div
        class=" flex flex-row items-center justify-between align-middle py-4 text-primary-content"
      >
        <h1 class="text-2xl font-bold">MemOS</h1>
        <div class="drawer-content flex flex-row [&_label]:px-1">
          <label class="drawer-button btn-primary" for="my-drawer">重组</label>
          <label class="drawer-button btn-primary" for="my-drawer">设置</label>
        </div>
      </div>
      <GithubCalendar />
      <NoteEditor on:focus={() => (editing = true)} />
    </div>
    <div
      class=" overflow-auto container mx-auto px-4 max-w-3xl"
      style=" height:calc(100vh - 300px);"
    >
      <div class="flex flex-col">
        {#each $notes as note (note.id)}
          <NoteBlock {note} />
        {/each}
        <div class="h-6 p-4 mb-4 pb-20"></div>
      </div>
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"
    ></label>
    <ul class="menu bg-secondary text-secondary-content min-h-full w-80 p-4">
      <Settings />
    </ul>
  </div>
</div>
