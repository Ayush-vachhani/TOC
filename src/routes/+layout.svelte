<script>
    import "../app.pcss";
    import Navbar from "$lib/Navbar.svelte";
</script>


<main class="flex flex-col h-screen">
    <Navbar />
    <div class="flex-grow m-4 p-4 border-2">
        <slot/>
    </div>
</main>
