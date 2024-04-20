<script lang="ts">
  import { Position, type NodeProps, Handle, useHandleConnections } from '@xyflow/svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];
  export let data: $$Props['data'];

  const topConnections = useHandleConnections({ nodeId: id, type: 'target' });
  const bottomConnections = useHandleConnections({ nodeId: id, type: 'source' });


  $: isConnectableTop = $topConnections.length === 0;
  $: isConnectableBottom = $bottomConnections.length === 0;
</script>

<div class="customNode">
	<Handle type="target" position={Position.Left} isConnectable={isConnectableTop} />
	<Handle type="source" position={Position.Right} isConnectable={isConnectableBottom} />
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
