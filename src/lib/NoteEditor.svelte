<script lang="ts">
  import { notes, tags } from './store';
  import TagAutocomplete from './TagAutocomplete.svelte';

  let content = '';
  let textarea: HTMLTextAreaElement;
  let tagAutocomplete = {
    visible: false,
    query: '',
    position: { top: 0, left: 0 }
  };

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    const cursorPos = target.selectionStart;
    
    // Check for # character
    const textBeforeCursor = value.slice(0, cursorPos);
    const match = textBeforeCursor.match(/#(\w*)$/);
    
    if (match) {
      const rect = textarea.getBoundingClientRect();
      const position = getCaretCoordinates();
      
      tagAutocomplete = {
        visible: true,
        query: match[1],
        position: {
          top: position.top + rect.top + window.scrollY,
          left: position.left + rect.left
        }
      };
    } else {
      tagAutocomplete.visible = false;
    }
  }

  function handleTagSelect(event: CustomEvent<string>) {
    const tagName = event.detail;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = content.slice(0, cursorPos);
    const textAfterCursor = content.slice(cursorPos);
    const lastHashIndex = textBeforeCursor.lastIndexOf('#');
    
    content = textBeforeCursor.slice(0, lastHashIndex) + 
              `#${tagName} ` + 
              textAfterCursor;
    
    tagAutocomplete.visible = false;
    textarea.focus();
  }

  function handleSubmit() {
    if (content.trim()) {
      notes.addNote(content);
      content = '';
      tagAutocomplete.visible = false;
    }
  }

  function getCaretCoordinates() {
    const textBeforeCursor = content.slice(0, textarea.selectionStart);
    const lines = textBeforeCursor.split('\n');
    const currentLineNumber = lines.length - 1;
    const currentLineText = lines[currentLineNumber];
    
    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const fontSize = parseFloat(computedStyle.fontSize);
    
    return {
      top: currentLineNumber * lineHeight,
      left: currentLineText.length * (fontSize * 0.6)
    };
  }
</script>

<div class="bg-white rounded-lg shadow-md p-4 mb-6 relative">
  <textarea
    bind:value={content}
    bind:this={textarea}
    on:input={handleInput}
    class="w-full h-32 p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Write your note in Markdown... Use #tag to add tags"
  ></textarea>
  
  {#if tagAutocomplete.visible}
    <TagAutocomplete
      visible={tagAutocomplete.visible}
      query={tagAutocomplete.query}
      position={tagAutocomplete.position}
      on:select={handleTagSelect}
    />
  {/if}
  
  <button
    on:click={handleSubmit}
    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
  >
    Add Note
  </button>
</div>