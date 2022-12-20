<script lang="ts">
    import MDPGraph from "$lib/components/MDP.svelte";
    import Tags from "$lib/components/Tags.svelte";
    import { MDP } from "./mdp";
    import type { States, Actions, Transitions } from "$lib/types";

    let states: States = {};
    let transitions: Transitions = {};
    let actions: Actions = {};
    let mdp: MDP;
    
	// export let data: PageData;

    function updateGraph(
        category: "states" | "actions" | "transitions",
        input: States | Actions | Transitions,
    ) {
        if (!mdp) mdp = new MDP({s: states, a: actions, t: transitions});
        mdp.update(category, input);
    }

    function clearGraph() {
        states = {};
        transitions = {};
        actions = {};
        mdp.clear();
    }

    $: updateGraph("states", states);
    $: updateGraph("actions", actions);
    $: updateGraph("transitions", transitions);
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
                <Tags bind:tags={states} placeholder="States" title="Type the name of a state then press enter" color={true}/>
                <Tags bind:tags={actions} placeholder="Actions" title="Type the name of a action then press enter" color={true}/>
                <input type="text" name="transitions" placeholder="Transitions" title="Type the name of a transition then select a start and end state" />
                <!-- bind transitions -->
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
            <div class="graph-title">
                <h3>MDP Graph</h3>
                <!-- https://js.cytoscape.org/#core/export -->
                <input type="button" class="alarm" on:click={() => clearGraph()} value="Clear" />
            </div>
            <MDPGraph bind:states={states} bind:actions={actions} bind:transitions={transitions}/>
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
    .graph-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>