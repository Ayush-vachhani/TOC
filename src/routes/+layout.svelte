<script>
    import "../app.pcss";
    import Navbar from "$lib/Navbar.svelte";
</script>


<main class="bg-background-dark h-screen">
    <Navbar/>
    <div class="flex-grow m-4 p-4">
        <slot/>
    </div>
</main>
