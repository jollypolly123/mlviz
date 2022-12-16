<script lang="ts">
	import cytoscape from "cytoscape";
    import { randInt } from "$lib/utils";
    import type { States } from "$lib/types";

    export let states: States;

    let graphDiv: HTMLDivElement;
    let cy: cytoscape.Core;
  
	const init = (container: HTMLElement) => {
        cy = cytoscape({
            container: container,
            elements: [],
            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(id)',
                        'text-valign': 'top',
                        'shape': 'ellipse',
                        'font-size': 12,
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ]
        });
	}

    const addNodes = (cy: cytoscape.Core, states: States) => {
        const nodeIDs = cy.nodes().reduce((acc, node) => {
            (acc as { [ id: string ]: string})[node.id()] = "";
            return acc;
        }, {});
        const newNodes = Object.keys(states).filter((stateID) => !(stateID in nodeIDs));
        cy.add(newNodes.map((stateID) => ({ 
            group: 'nodes', 
            data: { id: stateID },
            position: { x: randInt(10, cy.width()-10), y: randInt(10, cy.height()-10) },
            style: {
                'background-color': states[stateID].color,
            }
        })));
    }

	$: init(graphDiv);
    $: addNodes(cy, states);

	const container = true;

</script>


<div class:container bind:this={graphDiv} />

<style>
    .container {
        height: 50vh;
        border: 1px solid black;
    }
</style>