<script>
    import { TabBar } from "stdf";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let labels = [];
    export let active = 0;
    const clickFun = (e) => {
        active = e.detail;
        dispatch("change", active);
    };
</script>

<div class="fixed w-full bottom-0">
    <TabBar {active} {labels} on:change={clickFun} />
</div>
