<script lang="ts">
	import cytoscape from "cytoscape";
    import { randInt } from "$lib/utils";

    export let states: string[];

    let graphDiv: HTMLDivElement;
    let cy: cytoscape.Core;
  
	const init = (container: HTMLElement) => {
        cy = cytoscape({
            container: container,
            elements: [],
        });
	}

    const addNodes = (cy: cytoscape.Core, states: string[]) => {
        cy.add(states.map((state) => ({ 
            group: 'nodes', 
            data: { id: state },
            position: { x: randInt(10, cy.width()-10), y: randInt(10, cy.height()-10) }
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