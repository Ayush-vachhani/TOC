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
<div class="flex flex-row p-10">
    <div class="grow h-14">
        <div class="flex flex-col gap-10 p-10">
            <div>
                <Label for="first_name" class="mb-2 text-2xl">Enter the regex</Label>
                <Input type="text" placeholder="regex expression" class="w-4/5 bg-output-box" required bind:value={inputRegex} on:input={renderFA}/>
            </div>
            <div> 
                <Label>
                <div class="font-sans text-2xl">Convert to</div>
                <Select class="mt-2 w-4/5" items={options} bind:value={selected} on:change={renderFA}/>
                </Label>
            </div>
            <div class="bg-box-background rounded-2xl w-4/5 h-[300px]">
                <div class="px-10 py-3 flex flex-col justify-around">
                    <div class="underline text-3xl">Regex Basics</div>
                    <div class="mt-5 flex flex-col">
                        <p>a|c - match a or c</p>
                        <p>a*  - 0 or more</p>
                        <p>a+  - 1 or more</p>
                        <p> a?  -  any character in alphabet set</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-output-box rounded-2xl">
        <p class=" text-white p-5 text-3xl">Final Output    :</p>
        <div class="sample px-32 py-48" bind:this={Graph}/>
    </div>
</div>
