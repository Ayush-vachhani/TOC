<script>
    import {Button, CloseButton, Drawer, Sidebar, SidebarGroup, SidebarItem} from "flowbite-svelte";
    import {BarsOutline} from "flowbite-svelte-icons";
    import {sineIn} from "svelte/easing";
    import {page} from "$app/stores";

    let hidden = true;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
    $: activeUrl = $page.url.pathname;
</script>

<div class="text-center">
    <Button color="none" on:click={() => (hidden = false)}>
        <BarsOutline class="scale-150 text-fontColor"/>
    </Button>
</div>
<Drawer bind:hidden={hidden} id="sidebar2" {transitionParams} transitionType="fly">
    <div class="flex items-center">
        <h5 class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400" id="drawer-navigation-label-3">
            Menu</h5>
        <CloseButton class="mb-4 dark:text-white" on:click={() => (hidden = true)}/>
    </div>
    <Sidebar {activeUrl}>
        <SidebarGroup>
            <SidebarItem href="/" label="Home"></SidebarItem>
            <SidebarItem href="/REGEX-to-FA" label="REGEX TO FA"></SidebarItem>
            <SidebarItem href="/NFA-to-DFA" label="NFA TO DFA"></SidebarItem>
        </SidebarGroup>
    </Sidebar>
</Drawer>