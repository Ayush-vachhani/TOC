<script lang="ts">
    import { onMount } from 'svelte';
    import {instance} from '@viz-js/viz';

    let Graph:HTMLElement;
    let initialState: string = 'a';
    let finalStates: string[] = ['b','d'];
    let transitions: { from: string, to: string, label: string }[] = [{ from: 'a', to: 'b', label: '0' },{ from: 'a', to: 'c', label: '1' }];

    onMount(() => {
        renderGraph();
    });

    function renderGraph() {
        let dotGraph = `digraph {
        rankdir=LR;
        node [shape=circle];
        {rank = same; node [shape=point]; init_node} -> ${initialState};
        ${initialState};`;

        for (const transition of transitions) {
            dotGraph += `  ${transition.from} -> ${transition.to} [label="${transition.label}"];\n`;
        }

        // Specify final states
        for (const finalState of finalStates) {
            dotGraph += `  ${finalState} [peripheries=2];\n`;
        }

        dotGraph += `}`; // Close the digraph

        instance().then(viz => {
            Graph.innerHTML = viz.renderSVGElement(dotGraph).outerHTML;
        });
        console.log(dotGraph)
    }

    function addTransition() {
        transitions = [...transitions, { from: '', to: '', label: '' }];
    }

    function removeTransition(index: number) {
        transitions.splice(index, 1);
    }

</script>

<div class="sample" bind:this={Graph}/>
