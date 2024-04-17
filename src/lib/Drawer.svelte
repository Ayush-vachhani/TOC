<script>
    import {Button, CloseButton, Drawer, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper} from "flowbite-svelte";
    import {ListOutline} from "flowbite-svelte-icons";
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
    <Button on:click={() => (hidden = false)}><ListOutline /></Button>
</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden} id="sidebar2">
    <div class="flex items-center">
        <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
        <CloseButton on:click={() => (hidden = true)} class="mb-4 dark:text-white" />
    </div>
    <Sidebar {activeUrl}>
            <SidebarGroup>
                <SidebarItem label="Home" href="/"></SidebarItem>
                <SidebarItem label="REGEX TO FA" href="/REGEX-to-FA"></SidebarItem>
                <SidebarItem label="NFA TO DFA" href="/NFA-to-DFA"></SidebarItem>
            </SidebarGroup>
    </Sidebar>
</Drawer>