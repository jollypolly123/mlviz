<script lang="ts">
    import MDPGraph from "$lib/components/MDP.svelte";
    import Tags from "$lib/components/Tags.svelte";
    import Modal, { getModal } from "$lib/components/Modal.svelte";
    import type { States, Actions, Transitions, Rewards } from "$lib/types";
    import { MDP } from "./mdp";
    
	const container = true;
    const inputRow = true;
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
    
    let rewardAction: string = actionPlaceholder;
    let rewardState: string = startStatePlaceholder;
    let reward: number = 0;

    let transitionAction: string = actionPlaceholder;
    let transitionStartState: string = startStatePlaceholder;
    let transitionEndState: string = endStatePlaceholder;
    let probability: number = 1;

    function updateGraph(
        category: "states" | "actions" | "transitions" | "rewards",
        input: States | Actions | Transitions | Rewards,
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

    function addReward() {
        if (rewardAction === actionPlaceholder || rewardState === startStatePlaceholder) {
            openInfoModal("Invalid Reward", "Please select an action and state.");
            return;
        } else {
            const rewardId = `${rewardState}-${rewardAction}`;
            if (rewardId in rewards) {
                openInfoModal("Invalid Reward", "This reward already exists.");
                return;
            } else {
                rewards[rewardId] = {
                    state: states[rewardState],
                    action: actions[rewardAction],
                    value: reward
                };
            }
        }
    }

    function deleteReward(id: string) {
        delete rewards[id];
        rewards = rewards;
    }

    function addTransition() {
        if (transitionAction === actionPlaceholder || transitionStartState === startStatePlaceholder || transitionEndState === endStatePlaceholder) {
            openInfoModal("Invalid Transition", "Please select an action, start state, and end state.");
            return;
        } else if (probability < 0 || probability > 1) {
            openInfoModal("Invalid Transition", "Probability must be between 0 and 1.");
            return;
        } else {
            const transitionId = `${transitionStartState}-${transitionAction}-${transitionEndState}`;
            if (transitionId in transitions) {
                openInfoModal("Invalid Transition", "This transition already exists.");
                return;
            } else {
                transitions[transitionId] = {
                    startState: states[transitionStartState],
                    action: actions[transitionAction],
                    endState: states[transitionEndState],
                    probability: probability
                };
            }
        }
    }

    function deleteTransition(id: string) {
        delete transitions[id];
        transitions = transitions;
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
            <Tags bind:tags={states} title="States" placeholder="Enter state labels..." hover="Type the name of a state then press enter" color={true}/>
            <Tags bind:tags={actions} title="Actions" placeholder="Enter action labels..." hover="Type the name of an action then press enter" color={true}/>
            <div class:inputRow>
                <label for="rewards">Rewards</label>
                <input type="button" class="info" on:click={() => addReward()} value="Add Reward" />
            </div>
            <div class:inputRow>
                <select class:transition bind:value={rewardState}>
                    <option value={startStatePlaceholder}>{startStatePlaceholder}</option>
                    {#each Object.keys(states) as state}
                        <option value={state}>
                            {state}
                        </option>
                    {/each}
                </select>
                <select class:transition bind:value={rewardAction}>
                    <option value={actionPlaceholder}>{actionPlaceholder}</option>
                    {#each Object.keys(actions) as action}
                        <option value={action}>
                            {action}
                        </option>
                    {/each}
                </select>
                <input type="text" class:transition bind:value={reward} placeholder="Reward" title="Reward Value" />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Action</th>
                        <th>Reward</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.values(rewards) as reward}
                        <tr>
                            <td>{reward.state.name}</td>
                            <td>{reward.action.name}</td>
                            <td>{reward.value}</td>
                            <td>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div class="edit" on:click={() => {}}>&#9998;</div>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div class="delete" on:click={() => deleteReward(
                                    `${reward.state.name}-${reward.action.name}`
                                )}>&#8855;</div>
                            </td> 
                        </tr>
                    {/each}
                </tbody>
            </table>
            <div class:inputRow>
                <label for="transitions">Transitions</label>
                <input type="button" class="info" on:click={() => addTransition()} value="Add Transition" />
            </div>
            <div class:inputRow>
                <select class:transition bind:value={transitionStartState}>
                    <option value={startStatePlaceholder}>{startStatePlaceholder}</option>
                    {#each Object.keys(states) as state}
                        <option value={state}>
                            {state}
                        </option>
                    {/each}
                </select>
                <select class:transition bind:value={transitionAction}>
                    <option value={actionPlaceholder}>{actionPlaceholder}</option>
                    {#each Object.keys(actions) as action}
                        <option value={action}>
                            {action}
                        </option>
                    {/each}
                </select>
                <select class:transition bind:value={transitionEndState}>
                    <option value={endStatePlaceholder}>{endStatePlaceholder}</option>
                    {#each Object.keys(states) as state}
                        <option value={state}>
                            {state}
                        </option>
                    {/each}
                </select>
                <input type="text" class:transition bind:value={probability} placeholder="Probability" title="Probability" />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Start</th>
                        <th>Action</th>
                        <th>End</th>
                        <th>Prob.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.values(transitions) as transition}
                        <tr>
                            <td>{transition.startState.name}</td>
                            <td>{transition.action.name}</td>
                            <td>{transition.endState.name}</td>
                            <td>{transition.probability}</td>
                            <td>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div class="edit" on:click={() => {}}>&#9998;</div>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div class="delete" on:click={() => deleteTransition(
                                    `${transition.startState.name}-${transition.action.name}-${transition.endState.name}`
                                )}>&#8855;</div>
                            </td> 
                        </tr>
                    {/each}
                </tbody>
            </table>
            <h5><i>Automatically generates your graph!</i></h5>
        </div>
        <div class="inputs">
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
            <div class="buttons">
                <input disabled type="submit" on:click={() => console.log("Calculate something")} value="Calculate" title="Coming Soon!" />
                <input disabled type="submit" on:click={() => console.log("Run Simulation")} value="Run Simulation" title="Coming Soon!" />
            </div>
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
    table {
        border: 1px solid var(--color-text-light);
        margin: .2rem;
        width: calc(100% - .4rem);
        table-layout:fixed;
    }
    td {
        text-align: center;
        overflow-x: hidden;
        overflow-wrap: break-word;
    }
    .inputRow {
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
        display: block;
        padding: 0 1rem 0 1rem;
        width: 30%;
    }
    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .hyperparameters {
        display: inline-block;
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
    .edit {
        color: var(--color-theme-2);
        font-size: 1.5rem;
        margin: 0 0 0 1rem;
        cursor: pointer;
    }
    .delete {
        color: var(--color-alert);
        font-size: 1.5rem;
        margin: 0 0 0 1rem;
        cursor: pointer;
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