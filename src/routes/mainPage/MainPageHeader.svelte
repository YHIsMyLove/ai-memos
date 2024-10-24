<script>
    let lang = sessionStorage.getItem("lang") === "en_US" ? "en_US" : "zh_CN";
    $: isZh = lang === "zh_CN";
</script>

<div class="flex justify-center items-center text-center gap-4 pt-10">
    <a
        class="flex flex-col items-center w-10"
        href="https://kit.svelte.dev"
        target="_blank"
        rel="noreferrer"
    >
        <img src="/svelte.svg" alt="Svelte Logo" />
    </a>+
    <a
        class="flex flex-col items-center w-10"
        href="https://tailwindcss.com"
        target="_blank"
        rel="noreferrer"
    >
        <img src="/tailwindcss.svg" alt="Tailwind Logo" />
    </a>+
    <a
        class="flex flex-col items-center w-8"
        href="https://stdf.design"
        target="_blank"
        rel="noreferrer"
    >
        <svg viewBox="0 0 90 80" fill="currentColor">
            <path
                class="text-primary dark:text-dark"
                d="M0 0H20H40H50C64.8056 0 77.7325 8.04398 84.6487 20H50H40V22.6757V30H50C55.5229 30 60 34.4771 60 40C60 45.5229 55.5229 50 50 50H40V57.3243V78.7398V80H20V66.4583V20H15.3513H0V0ZM50 80C72.0914 80 90 62.0914 90 40C90 36.547 89.5625 33.1962 88.7398 30H67.3244C69.0261 32.9417 70 36.3571 70 40C70 51.0457 61.0457 60 50 60V80Z"
            />
            <path
                class="text-dark dark:text-primary"
                d="M20 30V0L0 50H20V80L40 30H20Z"
            />
        </svg>
    </a>
</div>
<div class="text-center my-6 text-xs">
    {#if isZh}
        <p>这是一个使用 SvelteKit + Tailwind + STDF 构建的模板。</p>
        <p class="mt-2">点击上方 LOGO 了解更多。</p>
    {:else}
        <p>This is a template using SvelteKit + TailwindCSS + STDF.</p>
        <p class="mt-2">Click the logo above to learn more.</p>
    {/if}
</div>
