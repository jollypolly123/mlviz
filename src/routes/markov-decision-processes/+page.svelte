<script lang="ts">
    import MDPGraph from "$lib/components/MDP.svelte";
    import Tags from "$lib/components/Tags.svelte";

    let states: string[] = [];
    let transitions: string[] = [];
    let actions: string[] = [];
    let rewards: string[] = [];
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
            <!-- add tags https://stackoverflow.com/questions/49527155/tag-key-how-to-add-an-tag-while-pressing-enter-button -->
            <form>
                <h4>MDP Definition</h4>
                <Tags bind:tags={states} placeholder="States" title="Type the name of a state then press enter"/>
                <input type="text" name="transitions" placeholder="Transitions" title="Type the name of a transition then select a start and end state" />
                <!-- bind states -->
                <input type="text" name="actions" placeholder="Actions" title="Type the name of a action then select a start and end state" />
                <!-- bind states -->
                <input type="text" name="rewards" placeholder="Rewards" title="Select an action and assign a reward"/>
                <!-- bind states -->
                <h5><i>Automatically generates your graph!</i></h5>
            </form>
        </div>
        <div class="inputs">
            <form>
                <h4>Training Hyperparameters</h4>
                <input disabled type="text" name="discount" placeholder="Discount value (gamma)" />
                <input disabled type="text" name="learning" placeholder="Learning rate" />
                <input disabled type="text" name="epsilon" placeholder="Epsilon" />
                <input disabled type="text" name="horizon" placeholder="Horizon" />
                <input disabled type="text" name="iterations" placeholder="Number of iterations" />
                <input disabled type="submit" on:click={() => console.log("Calculate something")} value="Calculate" />
            </form>
        </div>
        <div class="viz">
            <h3>MDP Graph</h3>
            <MDPGraph bind:states={states}/>
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