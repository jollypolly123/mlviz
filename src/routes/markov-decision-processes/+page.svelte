<script lang="ts">
</script>

<svelte:head>
	<title>Markov Decision Processes</title>
	<meta name="description" content="A visualization tool for Markov Decision Processes (MDPs)" />
</svelte:head>

<div>
    <h1>Markov Decision Process Visualization</h1>

    <p>
        This tool allows you to visualize Markov Decision Processes (MDPs) and their value functions.
    </p>

    <form>
        <h2>MDP Definition</h2>
        <input type="text" name="states" placeholder="States" />
        <input type="text" name="transitions" placeholder="Transitions" />
        <input type="text" name="actions" placeholder="Actions" />
        <input type="text" name="rewards" placeholder="Rewards" />
        
        <h2>Training Hyperparameters</h2>
        <input type="text" name="discount" placeholder="Discount value (gamma)" />
        <input type="text" name="learning" placeholder="Learning rate" />
        <input type="submit" value="Submit" />
    </form>

    <h3>Generated graph</h3>
    
    <h3>Calculate values</h3>
    <form>
        <input type="text" name="horizon" placeholder="Horizon" />

        <input type="text" name="iterations" placeholder="Number of iterations" />
        <input type="submit" value="Submit" />
    </form>
</div>