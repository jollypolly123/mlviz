<script lang="ts">
	import cytoscape from "cytoscape";

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

	const container = true;

</script>

<style>
    .container {
        width: 100%;
        height: 50vh;
    }

/* :global(*) {
	--primary-color: #27ccc0;
	font-family: sans-serif;
} */
</style>

<div class:container bind:this={graphDiv}>
</div>
