<script lang="ts">
    import {Handle, type NodeProps, Position, useHandleConnections} from '@xyflow/svelte';

    type $$Props = NodeProps;

    export let id: $$Props['id'];

    const topConnections = useHandleConnections({nodeId: id, type: 'target'});


    $: isConnectableTop = $topConnections.length === 0;
</script>

<div class="customNode">
    <Handle isConnectable={isConnectableTop} position={Position.Left} type="target"/>
    <div>End</div>
</div>

<style>
    .customNode {
        background: white;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid black;
    }
</style>
