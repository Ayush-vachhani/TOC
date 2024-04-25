<script lang="ts">
    import {FSM, removeTransition} from "$stores/FSM";
    import {
        Button,
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

<Table color="custom" class="bg-fontColor text-center text-black rounded-xl" hoverable={true}>
    <TableHead class="text-black text-md">
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
                    <TableBodyCell class="text-xl font-semibold dark:text-black">{fromState}</TableBodyCell>
                    <TableBodyCell class="text-xl font-semibold dark:text-black">{toState}</TableBodyCell>
                    <TableBodyCell class="text-xl font-semibold dark:text-black">{transitionLabel}</TableBodyCell>
                    <TableBodyCell class="text-xl font-semibold dark:text-black">
                        <Button color="none" class="bg-primary-dark text-white" on:click={() => removeTransition(fromState, toState)}>
                            Delete
                        </Button>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        {/each}
    </TableBody>
</Table>