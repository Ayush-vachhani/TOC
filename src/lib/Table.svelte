<script lang="ts">
    import {FSM, removeTransition} from "$stores/FSM";
    import {
        GradientButton,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from 'flowbite-svelte';

    let FSM_JSON = $FSM;
    FSM.subscribe(value => {
        FSM_JSON = value;
    });
</script>

<Table hoverable={true}>
    <TableHead>
        <TableHeadCell>From State</TableHeadCell>
        <TableHeadCell>To State</TableHeadCell>
        <TableHeadCell>Transition Label</TableHeadCell>
        <TableHeadCell>
            <span class="sr-only">Delete</span>
        </TableHeadCell>
    </TableHead>
    <TableBody>
        {#each Object.entries(FSM_JSON.transitions) as [fromState, transitions]}
            {#each Object.entries(transitions) as [toState, transitionLabel]}
                <TableBodyRow>
                    <TableBodyCell>{fromState}</TableBodyCell>
                    <TableBodyCell>{toState}</TableBodyCell>
                    <TableBodyCell>{transitionLabel}</TableBodyCell>
                    <TableBodyCell>
                        <GradientButton color="purpleToPink" on:click={() => removeTransition(fromState, toState)}>
                            Delete
                        </GradientButton>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        {/each}
    </TableBody>
</Table>