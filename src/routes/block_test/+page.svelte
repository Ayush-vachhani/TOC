<script lang="ts">
    import {writable} from 'svelte/store';
    import type {DefaultEdgeOptions, Edge} from '@xyflow/svelte';
    import {
        Background,
        BackgroundVariant,
        Controls,
        getConnectedEdges,
        getOutgoers,
        MarkerType,
        MiniMap,
        SvelteFlow
    } from '@xyflow/svelte';

    import NormalNode from '$lib/Blocks/NormalNode.svelte';
    import StartNode from '$lib/Blocks/StartNode.svelte';
    import StarNode from '$lib/Blocks/StarNode.svelte';
    import OrNode from '$lib/Blocks/OrNode.svelte';

    // 👇 this is important! You need to import the styles for Svelte Flow to work
    import '@xyflow/svelte/dist/style.css';

    const uniqueID = () => {
        return Math.random().toString(36);
    }

    const initialNodes: Node[] = [{
        id: '0',
        type: 'startNode',
        position: {x: 0, y: 25}
    }
    ]

    const nodeTypes = {
        normalNode: NormalNode,
        startNode: StartNode,
        starNode: StarNode,
        orNode: OrNode
    };

    const defaultEdgeOptions: DefaultEdgeOptions = {
        markerEnd: {type: MarkerType.ArrowClosed, color: '#555'},
        deletable: true,

    };

    const nodes = writable<Node[]>(initialNodes);
    const edges = writable<Edge[]>([]);

    function insertNode(label: string) {
        console.log("adding")
        let newNode = {
            id: uniqueID(),
            data: {label: label},
            position: {x: 0, y: 25},
            type: 'normalNode'
        }
        $nodes.push(newNode)

        $nodes = $nodes
        $edges = $edges
    }

    function insertStarNode() {
        let newNode = {
            id: uniqueID(),
            position: {x: 0, y: 25},
            type: 'starNode'
        }

        $nodes.push(newNode)
        $nodes = $nodes
        $edges = $edges
    }

    function insertOrNode() {
        let newNode = {
            id: uniqueID(),
            position: {x: 0, y: 25},
            type: 'orNode'
        }
        $nodes.push(newNode)

        $nodes = $nodes
        $edges = $edges
    }

    function convertHandler() {
        let re = toRegex($nodes[0])
        console.log(re)
        let e = document.getElementById('regex-result')
        e.value = re
    }

    function toRegex(node: Node) {
        var strings: string[] = []
        while (true) {
            if (node.type == 'startNode') {
                const nexts = getOutgoers(node, $nodes, $edges)
                if (nexts.length === 0) {
                    return ""
                }
                node = nexts[0]
                console.log(node)
            } else if (node.type == 'normalNode') {
                strings.push(node.data.label)
                const nexts = getOutgoers(node, $nodes, $edges)
                if (nexts.length === 0) {
                    break
                }
                node = nexts[0]
                console.log(node)
            } else if (node.type == 'starNode') {
                const connected = getConnectedEdges([node], $edges)
                let nextNode = undefined
                let sideNode = undefined
                for (let i in connected) {
                    let edge = connected[i]
                    if (edge.source != node.id) {
                        continue
                    }
                    if (edge.sourceHandle == 'source') {
                        nextNode = edge.target
                    } else if (edge.sourceHandle == 'branch') {
                        sideNode = edge.target
                    }
                    for (let cur in $nodes) {
                        if ($nodes[cur].id === nextNode) {
                            nextNode = $nodes[cur]
                        } else if ($nodes[cur].id === sideNode) {
                            sideNode = $nodes[cur]
                        }
                    }
                    console.log(nextNode)
                    console.log(sideNode)
                }
                if (sideNode !== undefined) {
                    strings.push('(')
                    strings.push(toRegex(sideNode))
                    strings.push(')*')
                }

                if (nextNode === undefined) {
                    break
                } else {
                    node = nextNode
                }
                console.log(node)
            } else if (node.type == 'orNode') {
                const connected = getConnectedEdges([node], $edges)
                let nextNode = undefined
                let sideNodes = []
                for (let i in connected) {
                    let sideNode = undefined
                    let edge = connected[i]
                    if (edge.source != node.id) {
                        continue
                    }
                    if (edge.sourceHandle == 'source') {
                        nextNode = edge.target
                    } else if (edge.sourceHandle == 'branch') {
                        sideNode = edge.target
                    }
                    for (let cur in $nodes) {
                        if ($nodes[cur].id === nextNode) {
                            nextNode = $nodes[cur]
                        } else if ($nodes[cur].id === sideNode) {
                            sideNode = $nodes[cur]
                        }
                    }
                    if (sideNode !== undefined) {
                        sideNodes.push(sideNode)
                    }
                }
                if (sideNodes.length > 0) {
                    strings.push('(')
                    for (let sideNode of sideNodes) {
                        strings.push(toRegex(sideNode))
                        strings.push('|')
                    }
                    strings.pop()
                    strings.push(')')
                }
                if (nextNode === undefined) {
                    break
                } else {
                    node = nextNode
                }
                console.log(node)
            }
        }
        return strings.join('')
    }
</script>

<!--
	👇 By default, the Svelte Flow container has a height of 100%.
	This means that the parent container needs a height to render the flow.
-->
<div style:height="500px">
    <SvelteFlow
        {defaultEdgeOptions}
        {edges}
        fitView
        {nodeTypes}
        {nodes}
    >
        <Controls/>
        <Background variant={BackgroundVariant.Dots}/>
        <MiniMap/>
    </SvelteFlow>
    <input id="add-string" type="field"/>
    <input class="insert-node" on:click={()=>{
	let e = document.getElementById('add-string')
	insertNode(e.value)
	}} type="button" value="Add string match"/>
    <br>
    <input class="insert-node" on:click={()=>{insertStarNode()}} type="button" value="Match Multiple Times"/>
    <input class="insert-node" on:click={()=>{insertOrNode()}} type="button" value="Match Any One"/>
    <br>
    <input id="regex-result" type="field"/>
    <input class="get-regex" on:click={convertHandler} type="button" value="Convert to RegEx"/>
</div>

<style>
    .insert-node {
        color: white;
        background-color: red;
        padding: 1em;
        margin: 1em;
    }

    .get-regex {
        color: white;
        background-color: green;
        padding: 1em;
        margin: 1em;
    }

    :root {
        --edge-stroke-default: #000000
    }
</style>
