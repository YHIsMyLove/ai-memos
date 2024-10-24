<script>
    import { Button, Icon, NavBar } from "stdf";
    let btn1Active = true;
    let btn2Active = false;
    const activeBtn = "!text-primary-300 !text-lg px-1";
    const defaultBtn = "!text-primary-200 px-1";
</script>

<NavBar left="none" titleSlot rightSlot>
    <div slot="title" class="flex flex-row items-center !text-xs h-12">
        <Button
            fill="text"
            heightOut="0"
            size="auto"
            injClass={btn1Active ? activeBtn : defaultBtn}
            on:click={() => {
                btn1Active = !btn1Active;
                btn2Active = !btn1Active;
            }}>时间线</Button
        >
        <Button
            fill="text"
            size="auto"
            heightOut="0"
            on:click={() => {
                btn2Active = !btn2Active;
                btn1Active = !btn2Active;
            }}
            injClass={btn2Active ? activeBtn : defaultBtn}>类别</Button
        >
    </div>
    <div slot="right" class="flex flex-row items-center text-xs h-12">
        <Icon name="list" size="16" injClass="pr-2" />
        <Icon name="search" size="16" />
        <div class=" w-4 h-full"></div>
    </div>
</NavBar>
