<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { DarkMode } from 'flowbite-svelte';
    import Drawer from "$lib/Drawer.svelte";
</script>

<Navbar let:NavContainer color="primary">
    <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
        <Drawer/>
        <NavBrand>
            <span class="self-center whitespace-nowrap text-xl font-semibold">TOC VISUALIZATION</span>
        </NavBrand>
        <NavHamburger />
        <NavUl>
<!--            <NavLi href="/">Home</NavLi>-->
        </NavUl>
        <DarkMode />
    </NavContainer>
</Navbar>