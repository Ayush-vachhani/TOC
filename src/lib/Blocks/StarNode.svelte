<script lang="ts">
    import {Handle, type NodeProps, Position, useHandleConnections} from '@xyflow/svelte';

    type $$Props = NodeProps;

    export let id: $$Props['id'];

    const topConnections = useHandleConnections({nodeId: id, id: 'target'});
    const bottomConnections = useHandleConnections({nodeId: id, id: 'source'});
    const rightConnections = useHandleConnections({nodeId: id, id: 'branch'});


    $: isConnectableTop = $topConnections.length === 0;
    $: isConnectableBottom = $bottomConnections.length === 0;
    $: isConnectableRight = $rightConnections.length == 0;
</script>

<div class="customNode">
    <Handle id="target" isConnectable={isConnectableTop} position={Position.Left} type="target"/>
    <Handle id="source" isConnectable={isConnectableBottom} position={Position.Right} type="source"/>
    <Handle id="branch" isConnectable={isConnectableRight} position={Position.Top} type="source"/>
    <div>Match Any Number of times</div>
</div>

<style>
    .customNode {
        background: white;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid black;
    }
</style>
