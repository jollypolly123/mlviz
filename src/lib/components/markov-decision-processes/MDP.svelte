<script context="module" lang="ts">
    let cy: cytoscape.Core;

    export function loadGraph(){
        alert("Coming soon!")
        // var element = document.createElement("input");
        // element.type = "file";
        // element.onchange = function(event) {
        //     var file = (event.target as HTMLInputElement).files![0];
        //     var reader = new FileReader();
        //     reader.onload = function(event) {
        //         var data = JSON.parse((event.target as FileReader).result as string);
        //         // TODO: update states, actions, transitions, rewards etc ugh
        //         cy.json(data);
        //     };
        //     reader.readAsText(file);
        // };
        // document.body.appendChild(element);
        // element.click();
        // document.body.removeChild(element);
    }

	export function saveGraph(){
        var data = JSON.stringify(cy.json());
        var blob = new Blob( [ data ], {
            type: 'application/json'
        });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "MDP-download.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
	}

    export function saveImg(){
        var pic = cy.png({full: true});
        var link = document.createElement('a');
        link.href = pic;
        link.download = 'MDP-download.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<script lang="ts">
	import cytoscape from "cytoscape";
    import { randInt } from "$lib/utils";
    import type { States, Actions, Transitions, Rewards } from "$lib/types";

    export let states: States;
    export let actions: Actions = {};
    export let transitions: Transitions = {};
    export let rewards: Rewards = {};

    let graphDiv: HTMLDivElement;
  
	const init = (container: HTMLElement): void => {
        cy = cytoscape({
            container: container,
            elements: [],
            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(id)',
                        'shape': 'ellipse',
                        'text-background-color': '#fff',
                        'text-background-opacity': 0.9,
                        'text-background-shape': 'roundrectangle',
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'label': 'data(probability)',
                        'width': 3,
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'text-background-color': '#fff',
                        'text-background-opacity': 1,
                        'text-background-shape': 'roundrectangle',
                    }
                },
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

    const removeNodes = (cy: cytoscape.Core, states: States): void => {
        const nodeIDs = cy.nodes().reduce((acc, node) => {
            (acc as { [ id: string ]: string})[node.id()] = "";
            return acc;
        }, {});
        const removedNodes = Object.keys(nodeIDs).filter((stateID) => !(stateID in states));
        removedNodes.forEach(nodeID => {
            cy.remove(`node[id="${nodeID}"]`);
        });
    }

    const editNodes = (cy: cytoscape.Core, states: States): void => {
        // TODO: verify/update/fix
        cy.nodes().forEach((node) => {
            node.style("background-color", states[node.id()].color);
        });
    }

    const addEdges = (cy: cytoscape.Core, transitions: Transitions, actions: Actions, rewards: Rewards): void => {
        const edgeIDs = cy.edges().reduce((acc, edge) => {
            (acc as { [ id: string ]: string})[edge.id()] = "";
            return acc;
        }, {});
        const newEdges = Object.keys(transitions).filter((transitionID) => !(transitionID in edgeIDs));
        cy.add(newEdges.map((transitionID) => {
            var source = transitions[transitionID].startState.name;
            var target = transitions[transitionID].endState.name;
            var action = transitions[transitionID].action.name;
            var rewardName = `${source}-${action}`;
            var rewardVal = rewardName in rewards ? rewards[rewardName].value : 0;
            var probability = transitions[transitionID].probability;
            var color = actions[action].color;
            return { 
                group: 'edges', 
                data: { 
                    id: transitionID, 
                    source: source, 
                    target: target,
                    reward: rewardVal,
                    action: action,
                    probability: probability,
                },
                style: {
                    'line-color': color,
                    'target-arrow-color': color,
                }
            }
        }));
    }

    const removeEdges = (cy: cytoscape.Core, transitions: Transitions): void => {
        const edgeIDs = cy.edges().reduce((acc, edge) => {
            (acc as { [ id: string ]: string})[edge.id()] = "";
            return acc;
        }, {});
        const removedEdges = Object.keys(edgeIDs).filter((transitionID) => !(transitionID in transitions));
        removedEdges.forEach(edgeID => {
            cy.remove(`edge[id="${edgeID}"]`);
        });
    }

    const editEdges = (cy: cytoscape.Core, transitions: Transitions, actions: Actions, rewards: Rewards): void => {
        cy.edges().forEach((edge) => {
            var rewardName = `${edge.data('source')}-${edge.data('action')}`;
            var rewardVal = rewardName in rewards ? rewards[rewardName].value : 0;
            var probability = transitions[edge.id()].probability;
            var color = actions[edge.data('action')].color;
            edge.data('reward', rewardVal);
            edge.data('probability', probability);
            edge.style('line-color', color);
            edge.style('target-arrow-color', color);
            edge.style('label', `${probability}`);
        });
    }

    const updateGraph = (
        cy: cytoscape.Core,
        category: "states" | "actions" | "transitions" | "rewards",
        input: any
    ): void => {
        if (Object.keys(input).length === 0) {
            if (category === "states") cy.remove(cy.nodes());
            else if (category === "actions" || category === "transitions") cy.remove(cy.edges());
            return;
        }

        if (category === "states") {
            if (cy.nodes().length < Object.keys(states).length) {
                addNodes(cy, states);
            } else if (cy.nodes().length > Object.keys(states).length) {
                removeNodes(cy, states);
            } else {
                editNodes(cy, states);
            }
        } else if (category === "actions") {
            editEdges(cy, transitions, actions, rewards);
        } else if (category === "transitions") {
            if (cy.edges().length < Object.keys(transitions).length) {
                addEdges(cy, transitions, actions, rewards);
            } else if (cy.edges().length > Object.keys(transitions).length) {
                removeEdges(cy, transitions);
            } else {
                editEdges(cy, transitions, actions, rewards);
            }
        } else if (category === "rewards") {
            editEdges(cy, transitions, actions, rewards);
        }
    }

	$: init(graphDiv);
    $: updateGraph(cy, "states", states);
    $: updateGraph(cy, "actions", actions);
    $: updateGraph(cy, "transitions", transitions);
    $: updateGraph(cy, "rewards", rewards);

	const container = true;
</script>

<div class:container bind:this={graphDiv} />

<style>
    .container {
        height: 50vh;
        border: 1px solid black;
    }
</style>