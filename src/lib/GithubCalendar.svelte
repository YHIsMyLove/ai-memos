<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import {
        globalCurrentDate,
        globalCurrentDay,
        notes,
        statistics,
    } from "./store";

    const dispatch = createEventDispatcher();

    export let viewType = "month";
    const ViewType = {
        MONTH: "month",
        WEEK: "week",
    };
    let currentDate = new Date();
    onMount(() => {});

    function getContributionLevel(count: number) {
        if (count === 0) return "bg-gray-200";
        if (count === 1) return "bg-green-200";
        if (count === 2) return "bg-green-300";
        if (count === 3) return "bg-green-400";
        return "bg-green-500";
    }

    /**
     * 更新月份
     * @param increment
     */
    function changeMonth(increment: number) {
        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + increment,
            1,
        );
        globalCurrentDate.set(currentDate);
    }

    /**
     * 切换日期
     * @param index
     */
    function switchDate(index: number) {
        const current = $statistics[index];
        if (current.count === 0) return;
        dispatch("squareClick", {
            date: new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                index + 1,
            ),
            contributions: current,
        });
        globalCurrentDay.set(new Date(current.date));
    }

    $: currentMonthYear = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });
</script>

<div
    class="p-1 text-primary-content w-full flex flex-col justify-center items-center"
>
    <div class="flex justify-center items-center mb-2 w-full">
        <button on:click={() => changeMonth(-1)} class="px-2 cursor-pointer">
            &lt;
        </button>
        <h2 class="text-lg font-semibold">{currentMonthYear}</h2>
        <button on:click={() => changeMonth(1)} class=" px-2 cursor-pointer">
            &gt;
        </button>
    </div>
    <div class="flex flex-wrap w-full justify-start items-center">
        {#each $statistics as item, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                style="width: calc(100% / 7 - 10px);"
                class=" flex-shrink-0 h-3 rounded-sm
                {getContributionLevel(item.count)} 
                cursor-pointer transition-colors duration-200 hover:opacity-80 m-1"
                title={`${item.count} contributions`}
                on:click={() => switchDate(index)}
            ></div>
        {/each}
    </div>
</div>
