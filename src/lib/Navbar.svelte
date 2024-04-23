<script>
    import {DarkMode, Navbar, NavBrand, NavHamburger, NavUl} from 'flowbite-svelte';
    import Drawer from "$lib/Drawer.svelte";
    export let Title;
</script>

<Navbar color="primary" let:NavContainer>
    <NavContainer class="flex flex-row gap-10 px-5 py-2 rounded-lg">
        <Drawer/>
        <div class="bg-primary-dark flex flex-row justify-between flex-1 rounded-xl h-14">
            <NavBrand class="text-3xl font-semibold text-fontColor flex-1 text-center">
                <span class="w-full self-center whitespace-nowrap font-thin" style="font-family: Julius Sans One;">{Title}</span>
            </NavBrand>
            <NavHamburger/>
            <NavUl>
                <!--            <NavLi href="/">Home</NavLi>-->
            </NavUl>
            <DarkMode class="mr-4 my-2" />
        </div>
    </NavContainer>
</Navbar>