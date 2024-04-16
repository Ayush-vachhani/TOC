<script lang="ts">
    //@ts-ignore
    import { RegParser } from 'automata.js';
    import {Select, Label, Input} from 'flowbite-svelte';
    import { onMount } from "svelte";
    import {instance} from "@viz-js/viz";

    let options = [
        { value: 'NFA', name: 'NFA' },
        { value: 'DFA', name: 'DFA' },
    ];
    let selected = "DFA"
    let inputRegex = "0+1*";

    let Graph:HTMLElement;
    let parser = new RegParser('0+1');
    let nfa = parser.parseToDFA();

    onMount(() => {
        renderFA()
    });

    function renderFA(){
        let parser = new RegParser(inputRegex);
        let fa:any;
        if (selected == "DFA"){
            fa = parser.parseToDFA();
        }
        else{
            fa = parser.parseToNFA();
        }
        const dotString = fa.toDotScript()
        instance().then(viz => {
            Graph.innerHTML = viz.renderSVGElement(dotString).outerHTML;
        });
    }
</script>

<Label>
    Convert to
    <Select class="mt-2" items={options} bind:value={selected} on:change={renderFA}/>
</Label>
<Label for="first_name" class="mb-2">Enter the regular expression</Label>
<Input type="text" placeholder="regex expression" required bind:value={inputRegex} on:input={renderFA}/>
<div class="sample" bind:this={Graph}/>