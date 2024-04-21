<script lang="ts">
  import { Position, type NodeProps, Handle, useHandleConnections } from '@xyflow/svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const bottomConnections = useHandleConnections({ nodeId: id, type: 'source' });

  $: isConnectableBottom = $bottomConnections.length === 0;
</script>

<div class="customNode">
	<Handle type="source" position={Position.Right} isConnectable={isConnectableBottom} />
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
