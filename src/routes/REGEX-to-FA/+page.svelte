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
<div class="flex flex-row p-6 py-0">
    <div class="grow h-14">
        <div class="flex flex-col gap-10 px-20 pt-6">
            <div>
                <Label for="first_name" class="mb-2 text-2xl" style="font-family: Inter;">Enter regex</Label>
                <Input type="text" placeholder="regex expression" class="bg-primary-dark " required bind:value={inputRegex} on:input={renderFA}/>
            </div>
            <div> 
                <Label>
                <div class="text-2xl" style="font-family: Inter;">Convert to</div>
                <Select class="mt-2" items={options} bind:value={selected} on:change={renderFA}/>
                </Label>
            </div>
            <div class="bg-box-background rounded-[10px]  h-[300px]">
                <div class="px-8 py-3 flex flex-col justify-around">
                    <div class="underline decoration-2 text-3xl font-bold" style="font-family: Inter;">Regex Basics:</div>
                    <div class="mt-2 flex flex-col px-4">
                        <p style="font-family: Inter;" class="text-2xl font-medium leading-loose">a|c - match a or c</p>
                        <p style="font-family: Inter;" class="text-2xl font-medium leading-relaxed">a*  - 0 or more</p>
                        <p style="font-family: Inter;" class="text-2xl font-medium leading-loose">a+  - 1 or more</p>
                        <p style="font-family: Inter;" class="text-2xl font-medium leading-relaxed">a?  - any character in alphabet set</p>
                        <p style="font-family: Inter;" class="text-2xl font-medium leading-loose">ε   - lambda</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-primary-dark rounded-[30px] w-7/12">
        <p class=" text-white p-5 text-3xl">Final Output    :</p>
        <div class="sample px-32 py-48" bind:this={Graph}/>
    </div>
</div>
