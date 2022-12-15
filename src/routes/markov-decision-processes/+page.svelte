<script lang="ts">
    import MDPGraph from "$lib/components/MDP.svelte";
</script>

<svelte:head>
	<title>Markov Decision Processes</title>
	<meta name="description" content="A visualization tool for Markov Decision Processes (MDPs)" />
</svelte:head>

<div class="container">
    <h1>Markov Decision Process Visualization</h1>
    <p>Visualize Markov Decision Processes (MDPs) and calculate their value functions.</p>

    <div class="tool">
        <div class="inputs">
            <form>
                <h4>MDP Definition</h4>
                <input type="text" name="states" placeholder="States" />
                <input type="text" name="transitions" placeholder="Transitions" />
                <input type="text" name="actions" placeholder="Actions" />
                <input type="text" name="rewards" placeholder="Rewards" />
                <input type="submit" on:click={() => console.log("Generate Graph")} value="Generate Graph" />
            </form>
        </div>
        <div class="inputs">
            <form>
                <h4>Training Hyperparameters</h4>
                <input type="text" name="discount" placeholder="Discount value (gamma)" />
                <input type="text" name="learning" placeholder="Learning rate" />
                <input type="text" name="epsilon" placeholder="Epsilon" />
                <input type="text" name="horizon" placeholder="Horizon" />
                <input type="text" name="iterations" placeholder="Number of iterations" />
                <input type="submit" on:click={() => console.log("Calculate something")} value="Calculate" />
            </form>
        </div>
        <div class="viz">
            <h3>MDP Graph</h3>
            <MDPGraph />
        </div>
    </div>
</div>

<style>
    form, p {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .inputs {
        width: 30%;
    }
    .viz {
        width: 50%;
        margin-left: 5rem;
    }
    input {
        margin: 0.2rem;
    }
</style>