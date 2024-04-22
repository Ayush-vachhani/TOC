<script>
    import {DarkMode, Navbar, NavBrand, NavHamburger, NavUl} from 'flowbite-svelte';
    import Drawer from "$lib/Drawer.svelte";
</script>

<Navbar color="primary" let:NavContainer>
    <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
        <Drawer/>
        <NavBrand>
            <span class="self-center whitespace-nowrap text-xl font-semibold">TOC VISUALIZATION</span>
        </NavBrand>
        <NavHamburger/>
        <NavUl>
            <!--            <NavLi href="/">Home</NavLi>-->
        </NavUl>
        <DarkMode/>
    </NavContainer>
</Navbar>