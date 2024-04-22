<script lang="ts">
    import {Handle, type NodeProps, Position, useHandleConnections} from '@xyflow/svelte';

    type $$Props = NodeProps;

    export let id: $$Props['id'];
    export let data: $$Props['data'];

    const topConnections = useHandleConnections({nodeId: id, type: 'target'});
    const bottomConnections = useHandleConnections({nodeId: id, type: 'source'});


    $: isConnectableTop = $topConnections.length === 0;
    $: isConnectableBottom = $bottomConnections.length === 0;
</script>

<div class="customNode">
    <Handle isConnectable={isConnectableTop} position={Position.Left} type="target"/>
    <Handle isConnectable={isConnectableBottom} position={Position.Right} type="source"/>
    <div>Match "{data.label}"</div>
</div>

<style>
    .customNode {
        background: white;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid black;
    }
</style>
