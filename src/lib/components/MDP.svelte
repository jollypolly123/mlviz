<script lang="ts">
	import cytoscape from "cytoscape";
    import { randInt } from "$lib/utils";
    import type { States, Actions, Transitions } from "$lib/types";

    export let states: States;
    export let actions: Actions = {};
    export let transitions: Transitions = {};

    let graphDiv: HTMLDivElement;
    let cy: cytoscape.Core;
  
	const init = (container: HTMLElement): void => {
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

    const addNodes = (cy: cytoscape.Core, states: States): void => {
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

    const addEdges = (cy: cytoscape.Core, transitions: Transitions): void => {
        // TODO: fix
        const edgeIDs = cy.edges().reduce((acc, edge) => {
            (acc as { [ id: string ]: string})[edge.id()] = "";
            return acc;
        }, {});
        const newEdges = Object.keys(transitions).filter((transitionID) => !(transitionID in edgeIDs));
        cy.add(newEdges.map((transitionID) => ({ 
            group: 'edges', 
            data: { id: transitionID, source: transitions[transitionID].startState, target: transitions[transitionID].endState },
        })));
    }

    const updateGraph = (
        cy: cytoscape.Core,
        category: "states" | "actions" | "transitions",
        input: any
    ): void => {
        if (Object.keys(input).length === 0) {
            if (category === "states") cy.remove(cy.nodes());
            else cy.remove(cy.edges());
            return;
        }

        if (category === "states") {
            if (cy.nodes().length !== Object.keys(input).length) {
                addNodes(cy, input);
            } else {
                cy.nodes().forEach((node) => {
                    node.style("background-color", input[node.id()].color);
                });
            }
        } else if (category === "actions") {

        } else if (category === "transitions") {

        }
    }

	$: init(graphDiv);
    $: updateGraph(cy, "states", states);
    $: updateGraph(cy, "actions", actions);
    $: updateGraph(cy, "transitions", transitions);

	const container = true;
</script>

<div class:container bind:this={graphDiv} />

<style>
    .container {
        height: 50vh;
        border: 1px solid black;
    }
</style>