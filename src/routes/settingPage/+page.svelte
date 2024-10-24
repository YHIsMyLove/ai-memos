<script>
    import { Cell, CellGroup, NavBar, Toast } from "stdf";
    import MainPageHeader from "../mainPage/MainPageHeader.svelte";
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<div class="sticky z-10 top-0">
    <NavBar title={"设置"} on:clickleft={() => window.history.back()} />
</div>

<CellGroup>
    <a href="webdavPage">
        <Cell
            title="组合使用"
            detail="无横向间距"
            mx="0"
            my="0"
            shadow="none"
            line
            radius="none"
        />
    </a>
    <Cell
        title="组合使用"
        detail="无圆角"
        mx="0"
        my="0"
        shadow="none"
        radius="none"
    />
</CellGroup>
<CellGroup>
    <Cell
        title="组合使用"
        detail="无横向间距"
        mx="0"
        my="0"
        shadow="none"
        line
        radius="none"
    />
    <Cell
        title="组合使用"
        detail="无圆角"
        mx="0"
        my="0"
        shadow="none"
        radius="none"
    />
</CellGroup>
