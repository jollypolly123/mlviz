<script lang="ts">
    import MDPGraph from "$lib/components/MDP.svelte";
    import Tags from "$lib/components/Tags.svelte";
    import Modal, { getModal } from "$lib/components/Modal.svelte";
    import type { States, Actions, Transitions, Rewards } from "$lib/types";
    import { MDP } from "./mdp";
    
	const container = true;
    const hyperparameter = true;
    const hyperparamLabel = true;
    const transition = true;
	// export let data: PageData;

    const actionPlaceholder = "Action";
    const startStatePlaceholder = "Start State";
    const endStatePlaceholder = "End State";

    let states: States = {};
    let actions: Actions = {};
    let rewards: Rewards = {};
    let transitions: Transitions = {};
    let mdp: MDP;

    let modalTitle: string = "";
    let modalContent: string = "";

    let selectedAction: string = actionPlaceholder;
    let selectedStartState: string = startStatePlaceholder;
    let selectedEndState: string = endStatePlaceholder;
    let probability: number = 1;
    let reward: number = 0;

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

    function addTransition() {
        if (selectedAction === actionPlaceholder || selectedStartState === startStatePlaceholder || selectedEndState === endStatePlaceholder) {
            openInfoModal("Invalid Transition", "Please select an action, start state, and end state.");
            return;
        } else {
            const transitionId = `${selectedStartState}-${selectedAction}-${selectedEndState}`;
            if (transitionId in transitions) {
                openInfoModal("Invalid Transition", "This transition already exists.");
                return;
            } else {
                transitions[transitionId] = {
                    startState: states[selectedStartState],
                    action: actions[selectedAction],
                    endState: states[selectedEndState],
                    probability: probability
                };
            }
        }
    }

    function openInfoModal(title: string, content: string) {
        modalTitle = title;
        modalContent = content;
        getModal().open();
    }

    $: updateGraph("states", states);
    $: updateGraph("actions", actions);
    $: updateGraph("transitions", transitions);
</script>

<svelte:head>
	<title>Markov Decision Processes</title>
	<meta name="description" content="A visualization tool for Markov Decision Processes (MDPs)" />
</svelte:head>

<div class:container>
    <h1>Markov Decision Process Visualization</h1>
    <p>Visualize Markov Decision Processes (MDPs) and calculate their value functions.</p>

    <div class="tool">
        <div class="inputs">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h4 on:click={() => openInfoModal(
                "MDP Definition Instructions", 
                ("States: Type the name of a state then press enter" + 
                "Actions: Type the name of an action then press enter" + 
                "Transitions: Select an action, then the start state and end state" + 
                "Rewards: Select a state and action, then define reward amount"))}>MDP Definition</h4>
                <!-- TODO: fix modal content -->
            <label for="states">States</label>
            <Tags bind:tags={states} placeholder="State label..." title="Type the name of a state then press enter" color={true}/>
            <label for="actions">Actions</label>
            <Tags bind:tags={actions} placeholder="Action label..." title="Type the name of an action then press enter" color={true}/>
            <label for="rewards">Rewards</label>
            <div id="input-row">
                <select class:transition bind:value={selectedAction}>
                    <option value={actionPlaceholder}>{actionPlaceholder}</option>
                    {#each Object.keys(actions) as action}
                        <option value={action}>
                            {action}
                        </option>
                    {/each}
                </select>
                <select class:transition bind:value={selectedStartState}>
                    <option value={startStatePlaceholder}>{startStatePlaceholder}</option>
                    {#each Object.keys(states) as state}
                        <option value={state}>
                            {state}
                        </option>
                    {/each}
                </select>
                <input type="text" class:transition bind:value={reward} placeholder="Reward" title="Reward Value" />
            </div>
            <input type="button" class="info" on:click={() => addTransition()} value="Add New Reward" />
            <table>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Action</th>
                        <th>Reward</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.values(rewards) as reward}
                        <tr>
                            <td>{reward.state.name}</td>
                            <td>{reward.action.name}</td>
                            <td>{reward.value}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <label for="transitions">Transitions</label>
            <div id="input-row">
                <select class:transition bind:value={selectedAction}>
                    <option value={actionPlaceholder}>{actionPlaceholder}</option>
                    {#each Object.keys(actions) as action}
                        <option value={action}>
                            {action}
                        </option>
                    {/each}
                </select>
                <select class:transition bind:value={selectedStartState}>
                    <option value={startStatePlaceholder}>{startStatePlaceholder}</option>
                    {#each Object.keys(states) as state}
                        <option value={state}>
                            {state}
                        </option>
                    {/each}
                </select>
                <select class:transition bind:value={selectedEndState}>
                    <option value={endStatePlaceholder}>{endStatePlaceholder}</option>
                    {#each Object.keys(states) as state}
                        <option value={state}>
                            {state}
                        </option>
                    {/each}
                </select>
                <input type="text" class:transition bind:value={probability} placeholder="Probability" title="Probability" />
            </div>
            <input type="button" class="info" on:click={() => addTransition()} value="Add New Transition" />
            <table>
                <thead>
                    <tr>
                        <th>Start State</th>
                        <th>Action</th>
                        <th>End State</th>
                        <th>Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.values(transitions) as transition}
                        <tr>
                            <td>{transition.startState.name}</td>
                            <td>{transition.action.name}</td>
                            <td>{transition.endState.name}</td>
                            <td>{transition.probability}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <h5><i>Automatically generates your graph!</i></h5>
        </div>
        <div class="inputs">
            <form on:submit|preventDefault={() => {}}>
                <h4>Training Hyperparameters</h4>
                <div class="hyperparameters">
                    <label class:hyperparamLabel for="discount">Discount value (γ)</label>
                    <input type="text" name="discount" class:hyperparameter placeholder="0.0 to 1.0" />
                    <label class:hyperparamLabel for="learning">Learning rate (α)</label>
                    <input type="text" name="learning" class:hyperparameter placeholder="0.0 to 1.0" />
                    <label class:hyperparamLabel for="epsilon">Epsilon (ε)</label>
                    <input type="text" name="epsilon" class:hyperparameter placeholder="0.0 to 1.0" />
                    <label class:hyperparamLabel for="horizon">Horizon</label>
                    <input type="text" name="horizon" class:hyperparameter placeholder="0, 1, 2, ..." />
                    <label class:hyperparamLabel for="iterations">Number of iterations</label>
                    <input type="text" name="iterations" class:hyperparameter placeholder="0, 1, 2, ..." />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div class="buttons">
                    <input disabled type="submit" on:click={() => console.log("Calculate something")} value="Calculate" title="Coming Soon!" />
                    <input disabled type="submit" on:click={() => console.log("Run Simulation")} value="Run Simulation" title="Coming Soon!" />
                </div>
            </form>
        </div>
        <div class="viz">
            <div class="graph-title">
                <h3>MDP Graph</h3>
                <!-- TODO: https://js.cytoscape.org/#core/export -->
                <input type="button" class="alarm" on:click={() => clearGraph()} value="Clear" />
            </div>
            <MDPGraph bind:states={states} bind:actions={actions} bind:transitions={transitions}/>
        </div>
    </div>
</div>

<Modal>
	<h3>{modalTitle}</h3>
    {modalContent}
</Modal>

<style>
    p {
        text-align: center;
    }
    label {
        margin-top: .2rem;
    }
    #input-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .transition {
        margin: .2rem;
        height: 36px;
        width: 30%;
    }
    .inputs {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 1rem 0 1rem;
        width: 30%;
    }
    .buttons {
        float: bottom;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .hyperparameters {
        display: block;
    }
    .hyperparameter {
        float: right;
        width: 40%;
        margin: 0 0 .25rem 0;
    }
    .hyperparamLabel {
        float: left;
        width: 60%;
        margin: 10px 0 10px 0;
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