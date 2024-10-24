<script>
    import { setContext } from "svelte";
    import { Button, Cell, Icon, Calendar, TabBar } from "stdf";
    import { stdfTheme, switchTheme, darkMode } from "stdf/theme";
    import NintendoTheme from "../../data/Nintendo";
    import en_US from "stdf/lang/en_US";
    import zh_CN from "stdf/lang/zh_CN";
    import Counter from "./Counter.svelte";
    import MainPageHeader from "../mainPage/MainPageHeader.svelte";
    // @ts-ignore
    import { browser } from "$app/environment";

    if (browser) {
        //解决ios不支持按钮:active伪类
        // Solve the problem that ios does not support the button: active pseudo class
        document.body.addEventListener("touchstart", function () {
            //...空函数即可
            // ... Empty function is OK
        });
    }

    //切换亮暗模式(toggle light or dark mode)
    let mode = sessionStorage.getItem("mode") === "dark" ? "dark" : "light";
    if (mode === "dark") {
        darkMode(true);
    }
    const toggleModeFun = () => {
        if (mode === "dark") {
            // 切换到(light switch to light)
            mode = "light";
            darkMode(false);
            sessionStorage.setItem("mode", "light");
        } else {
            // 切换到(dark switch to dark)
            mode = "dark";
            darkMode(true);
            sessionStorage.setItem("mode", "dark");
        }
    };

    // 设置语言(setting language)
    let lang = sessionStorage.getItem("lang") === "en_US" ? "en_US" : "zh_CN";
    $: isZh = lang === "zh_CN";
    setContext(
        "STDF_lang",
        sessionStorage.getItem("lang") === "en_US" ? en_US : zh_CN,
    );
    const toggleLangFun = () => {
        lang = isZh ? "en_US" : "zh_CN";
        sessionStorage.setItem("lang", isZh ? "en_US" : "zh_CN");
        // 刷新(refresh)
        location.reload();
    };

    // 进度条(percent)
    let percent = 20;
    const reduceFunc = () => {
        percent > 0 && (percent -= 10);
    };
    const increaseFunc = () => {
        percent < 100 && (percent += 10);
    };

    // 日历(calendar)
    let visible = false;

    // 主题(theme)
    let theme = "STDF";
    const toggleThemeFun = () => {
        if (theme === "STDF") {
            theme = "Nintendo";
            switchTheme(NintendoTheme);
        } else {
            theme = "STDF";
            switchTheme(stdfTheme);
        }
    };
</script>

<div class="my-6">
    <a href="about">
        <Cell title={isZh ? "跳转 ABOUT" : "Go to ABOUT"} />
    </a>
</div>
<div class="my-6">
    <Cell
        title={isZh ? "暗模式" : "Dark mode"}
        right={{ type: "switch", switch: { check: mode === "dark" } }}
        on:click={toggleModeFun}
    />
</div>
<div class="mt-8">
    <Counter bind:percent />
</div>
<div class="mb-8">
    <Button heightIn="0" group fill="lineTheme">
        <div class="flex divide-x">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="flex-1 border-primary dark:border-dark py-2 active:opacity-80"
                on:click={reduceFunc}
            >
                -10
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="flex-1 border-primary dark:border-dark py-2 active:opacity-80"
                on:click={increaseFunc}
            >
                +10
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="flex-1 border-primary dark:border-dark py-2 active:opacity-80"
                on:click={() => (percent = 20)}
            >
                {isZh ? "重置" : "Reset"}
            </div>
        </div>
    </Button>
</div>
<div class="my-6">
    <Button fill="lineTheme" on:click={() => (visible = true)}
        >{isZh ? "日历" : "Calendar"}</Button
    >
</div>
<Calendar bind:visible />
<div class="my-6 px-8 flex justify-between">
    <Icon name="cake" theme />
    <Icon name="riding-line" />
    <Icon name="spy-line" theme />
    <Icon name="javascript-fill" injClass="text-[red] dark:text-green" />
    <Icon name="cup" theme />
</div>
<div class="px-4 text-xs">
    {isZh ? "图标：第一个来自" : "Icons: The first one comes from"}
    <a class="underline" href="https://heroicons.com">Heroicons</a>
    ,{isZh ? "最后一个来自" : "the last one comes from"}
    <a class="underline" href="https://iconpark.oceanengine.com">IconPark</a>
    ,{isZh ? "其余来自" : "the rest come from"}
    <a class="underline" href="https://remixicon.com">Remix Icon</a> 。
</div>
<div class="my-6">
    <Button on:click={toggleLangFun}
        >{isZh ? "切换语言" : "Toggle language"}</Button
    >
    <Button fill="lineTheme" on:click={toggleThemeFun}
        >{isZh ? "切换主题" : "Toggle theme"}</Button
    >
</div>
