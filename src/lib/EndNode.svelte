<script lang="ts">
  import { Position, type NodeProps, Handle, useHandleConnections } from '@xyflow/svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const topConnections = useHandleConnections({ nodeId: id, type: 'target' });


  $: isConnectableTop = $topConnections.length === 0;
</script>

<div class="customNode">
	<Handle type="target" position={Position.Left} isConnectable={isConnectableTop} />
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
