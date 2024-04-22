<script lang="ts">
    import {Handle, type NodeProps, Position, useHandleConnections} from '@xyflow/svelte';

    type $$Props = NodeProps;

    export let id: $$Props['id'];

    const bottomConnections = useHandleConnections({nodeId: id, type: 'source'});

    $: isConnectableBottom = $bottomConnections.length === 0;
</script>

<div class="customNode">
    <Handle isConnectable={isConnectableBottom} position={Position.Right} type="source"/>
    <div>Start</div>
</div>

<style>
    .customNode {
        background: white;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid black;
    }
</style>
