<script lang="ts">
	import cytoscape from "cytoscape";

    export let states: string[];

    let graphDiv: HTMLDivElement;
  
	const init = (container: HTMLElement) => {
        const cy = cytoscape({
            container: container,
            elements: [
                { data: { id: 'a' } },
                { data: { id: 'b' } },
                { data: { id: 'ab', source: 'a', target: 'b' } }
            ]
        });
	}

	$: init(graphDiv);
    $: console.log(states);

	const container = true;

</script>


<div class:container bind:this={graphDiv}>
</div>

<style>
    .container {
        height: 50vh;
        border: 1px solid black;
    }
</style>