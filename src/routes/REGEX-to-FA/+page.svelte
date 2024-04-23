<script lang="ts">
    //@ts-ignore
    import {RegParser} from 'automata.js';
    import {onMount} from "svelte";
    import {instance} from "@viz-js/viz";
    import {Input, Label, Select} from 'flowbite-svelte';

    let options = [
        {value: 'NFA', name: 'NFA'},
        {value: 'DFA', name: 'DFA'},
    ];
    let selected = "DFA"
    let inputRegex = "0+1*";

    let Graph: HTMLElement;

    onMount(() => {
        renderFA()
    });

    function renderFA() {
        let parser = new RegParser(inputRegex);
        let fa: any;
        if (selected == "DFA") {
            fa = parser.parseToDFA();
        } else {
            fa = parser.parseToNFA();
        }
        const dotString = fa.toDotScript()
        console.log(dotString)
        instance().then(viz => {
            Graph.innerHTML = viz.renderSVGElement(dotString).outerHTML;
        });
    }
</script>

<div class="flex flex-row gap-4 py-20 px-40">
    <div class="flex-1">
        <Label>
            Convert to
            <Select bind:value={selected} class="mt-2" items={options} on:change={renderFA}/>
        </Label>
        <Label class="mb-2" for="first_name">Enter the regular expression</Label>
        <Input bind:value={inputRegex} on:input={renderFA} placeholder="regex expression" required type="text"/>
    </div>
    <div bind:this={Graph} class="sample"/>
</div>
