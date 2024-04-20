<script lang="ts">
  import { Position, type NodeProps, Handle, useHandleConnections } from '@xyflow/svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const topConnections = useHandleConnections({ nodeId: id, id: 'target' });
  const bottomConnections = useHandleConnections({ nodeId: id, id: 'source' });


  $: isConnectableTop = $topConnections.length === 0;
  $: isConnectableBottom = $bottomConnections.length === 0;
</script>

<div class="customNode">
	<Handle id="target" type="target" position={Position.Left} isConnectable={isConnectableTop} />
	<Handle id="source" type="source" position={Position.Right} isConnectable={isConnectableBottom} />
	<Handle id="branch" type="source" position={Position.Top} />
	<div>Match Any One</div>
</div>

<style>
  .customNode {
    background: white;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid black;
  }
</style>
