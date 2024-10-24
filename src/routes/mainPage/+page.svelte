<script>
    import HeaderControlBar from "../../components/HeaderControlBar.svelte";
    let lang = sessionStorage.getItem("lang") === "en_US" ? "en_US" : "zh_CN";
    $: isZh = lang === "zh_CN";
    import { Cell, Icon, NavBar } from "stdf";
</script>

<HeaderControlBar />
<Cell
    title="左侧自定义大图片，标题超长，自动换行。其余的搭配自己去尝试吧。"
    subTitle="我这个次级标题也很...哦不长了。"
    left="slot"
    line={false}
>
    <div slot="left" class="mr-1 shrink-0">
        <img class="w-20 h-20" src="/assets/images/card.jpg" alt="" />
    </div>
</Cell>
<Cell
    title="左侧自定义大图片，标题超长，自动换行。其余的搭配自己去尝试吧。"
    subTitle="我这个次级标题也很...哦不长了。"
    left="slot"
    line={false}
>
    <div slot="left" class="mr-1 shrink-0">
        <img class="w-20 h-20" src="/assets/images/card.jpg" alt="" />
    </div>
</Cell>
<Cell
    title="左侧自定义大图片，标题超长，自动换行。其余的搭配自己去尝试吧。"
    subTitle="我这个次级标题也很...哦不长了。"
    left="slot"
    line={false}
>
    <div slot="left" class="mr-1 shrink-0">
        <img class="w-20 h-20" src="/assets/images/card.jpg" alt="" />
    </div>
</Cell>
<Cell
    title="左侧自定义大图片，标题超长，自动换行。其余的搭配自己去尝试吧。"
    subTitle="我这个次级标题也很...哦不长了。"
    left="slot"
    line={false}
>
    <div slot="left" class="mr-1 shrink-0">
        <img class="w-20 h-20" src="/assets/images/card.jpg" alt="" />
    </div>
</Cell>
