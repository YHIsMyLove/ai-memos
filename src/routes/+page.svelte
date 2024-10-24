<script>
	import NavTabar from "../components/NavTabar.svelte";
	import LoadingSkeleton from "../components/LoadingSkeleton.svelte";
	let activeMenu = 2;
	const menus = [
		{
			icon: { name: "calendar", size: 26 },
			component: "./demoPage/Demo.svelte",
		},
		{
			icon: { name: "agenda", size: 26 },
			component: "./about/+page.svelte",
		},
		{
			icon: { name: "home", size: 26 },
			component: "./demoPage/Counter.svelte",
		},
		{
			icon: { name: "category", size: 26 },
			component: "./mainPage/MainPageHeader.svelte",
		},
		{
			icon: { name: "apps", size: 26 },
			component: "./settingPage/+page.svelte",
		},
	];
	async function importComponent(path) {
		return import(path);
	}
</script>

<div class=" pb-[50px]">
	{#each menus as component, index}
		{#if activeMenu === index}
			{#await importComponent(component.component)}
				<LoadingSkeleton />
			{:then component}
				<svelte:component this={component.default} />
			{:catch error}
				<div>Error loading {component.component}: {error.message}</div>
			{/await}
		{/if}
	{/each}
</div>
<NavTabar
	active={activeMenu}
	labels={menus}
	on:change={(e) => (activeMenu = e.detail)}
/>
