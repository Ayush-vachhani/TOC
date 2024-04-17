<script lang="ts">
    import {onMount} from 'svelte';
    import {FSM, addFinalState, removeFinalState, addTransition} from "$stores/FSM";
    import {instance} from '@viz-js/viz';
    import {toDotScript} from "$lib/converter";
    import {GradientButton, Input, Label,} from "flowbite-svelte";
    import Table from "$lib/Table.svelte";
    import type {FSMJSON} from "../app";


    let Graph:HTMLElement;
    let finalState:string|null=null;
    let FSM_JSON:FSMJSON = $FSM;

    onMount(() => {
        return FSM.subscribe(value => {
            FSM_JSON = value;
            renderGraph();
        });
    });
    function renderGraph() {
        const dotString = toDotScript(FSM_JSON);
        console.log(dotString)
        instance().then(viz => {
            Graph.innerHTML = viz.renderSVGElement(dotString).outerHTML;
        });
    }
    function handleSubmit(event: Event) {
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const fromState = formData.get('FromState') as string;
        const inputSymbol = formData.get('InputSymbol') as string;
        const toState = formData.get('ToState') as string;
        console.log(fromState, inputSymbol, toState)
        addTransition(fromState, toState, inputSymbol);
        form.reset();
    }

</script>
<Label for="first_name" class="mb-2">Initial state</Label>
<!--<Input type="text" placeholder="initial state" required bind:value={FSM_JSON.initialState} on:input={renderGraph}/>-->
<Input type="text" placeholder="initial state" required bind:value={$FSM.initialState} on:input={renderGraph}/>

<Label for="first_name" class="mb-2">Add Final state</Label>
<Input type="text" placeholder="add final state" required bind:value={finalState}/>
<GradientButton color="greenToBlue" on:click={() => {addFinalState(finalState); finalState=null}}>Add Final State</GradientButton>
<br><br>
{#if FSM_JSON.acceptStates.length > 0}
    <div class="final-states-container">
        {#each FSM_JSON.acceptStates as state}
            <div class="final-state-item flex items-center mb-4">
                <h5 class="mb-2 mr-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{state}</h5>
                <GradientButton class="w-fit" color="redToYellow" on:click={() => removeFinalState(state)}>
                    Delete
                </GradientButton>
            </div>
        {/each}
    </div>
{/if}
<Table />
ADD MORE TRANSITIONS
<form on:submit|preventDefault={handleSubmit}>
    <Label for="inputSymbol" class="mb-2">From State</Label>
    <Input type="text" name="FromState" placeholder="eg. a, b" required />
    <Label for="inputSymbol" class="mb-2">Input Symbol</Label>
    <Input type="text" name="InputSymbol" placeholder="eg. 0, 1" required />
    <Label for="toState" class="mb-2">To State</Label>
    <Input type="text" name="ToState" placeholder="eg. c, d" required />
    <GradientButton color="greenToBlue" type="submit">Add Transition</GradientButton>
</form>
<div class="sample" bind:this={Graph}/>
