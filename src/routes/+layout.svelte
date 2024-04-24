<script>
    import "../app.pcss";
    import Navbar from "$lib/Navbar.svelte";
</script>


<main class="flex flex-col min-h-screen bg-background-dark" style="font-family: Julius Sans One;">
    <Navbar Title={"Regex to Finite Automata"} />
    <div class="flex-grow m-4 p-4">
        <slot/>
    </div>
</main>
