<script>
    import { Skeleton } from "stdf";
</script>

<div class="flex">
    <div class="grow">
        <Skeleton width="32" height="8" />
        <Skeleton type="p" />
    </div>
    <Skeleton type="video" width="32" height="32" />
</div>
{#each [1, 1, 1] as item}
    <div class="flex justify-between items-center">
        <div class="flex">
            <div class="flex">
                <Skeleton width="12" height="12" radius="full" />
                <div class="flex flex-col justify-between">
                    <Skeleton width="16" height="6" />
                    <Skeleton width="32" height="4" />
                </div>
            </div>
        </div>
        <Skeleton width="16" height="8" radius="full" />
    </div>
    <Skeleton width="full" height="1" />
{/each}
<div class="flex justify-between">
    <Skeleton width="16" height="16" />
    <Skeleton width="16" height="16" />
    <Skeleton width="16" height="16" />
    <Skeleton width="16" height="16" />
</div>
<Skeleton width="32" height="8" />
<Skeleton type="p" lines={5} />
