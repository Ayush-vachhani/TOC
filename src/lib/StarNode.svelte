<script lang="ts">
  import { Position, type NodeProps, Handle, useHandleConnections } from '@xyflow/svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];
  export let data: $$Props['data'];

  const topConnections = useHandleConnections({ nodeId: id, id: 'target' });
  const bottomConnections = useHandleConnections({ nodeId: id, id: 'source' });
  const rightConnections = useHandleConnections({nodeId: id, id: 'branch'});


  $: isConnectableTop = $topConnections.length === 0;
  $: isConnectableBottom = $bottomConnections.length === 0;
  $: isConnectableRight = $rightConnections.length == 0;
</script>

<div class="customNode">
	<Handle id="target" type="target" position={Position.Left} isConnectable={isConnectableTop} />
	<Handle id="source" type="source" position={Position.Right} isConnectable={isConnectableBottom} />
	<Handle id="branch" type="source" position={Position.Top} isConnectable={isConnectableRight} />
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
