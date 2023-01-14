<script lang="ts">
    import Tags from "$lib/components/Tags.svelte";
    import MDPGraph from "$lib/components/markov-decision-processes/MDP.svelte";
    import MDPDefinition from "$lib/components/markov-decision-processes/MDPDefinitionInstructions.svelte";
    import EditReward from "$lib/components/markov-decision-processes/EditReward.svelte";
    import EditTransition from "$lib/components/markov-decision-processes/EditTransition.svelte";
    import TrainingHyperparameters from "$lib/components/markov-decision-processes/TrainingHyperparametersInstructions.svelte";
    import Modal, { getModal } from "$lib/components/Modal.svelte";
    import ErrorMessage from "$lib/components/ErrorMessage.svelte";
    import type { States, Actions, Transitions, Rewards } from "$lib/types";
    import { MDP } from "./mdp";
    
	const container = true;
    const inputRow = true;
    const hyperparameter = true;
    const hyperparamLabel = true;
    const transition = true;
    const icon = true;
	// export let data: PageData;

    const actionPlaceholder = "Action";
    const startStatePlaceholder = "Start State";
    const endStatePlaceholder = "End State";
    const initStatePlaceholder = "Init State";

    let states: States = {};
    let actions: Actions = {};
    let rewards: Rewards = {};
    let transitions: Transitions = {};
    let mdp: MDP;

    let modalContent: any;
    let modalProps: { [key: string]: any } = {};
    
    let rewardAction: string = actionPlaceholder;
    let rewardState: string = startStatePlaceholder;
    let reward: number = 0;

    let transitionAction: string = actionPlaceholder;
    let transitionStartState: string = startStatePlaceholder;
    let transitionEndState: string = endStatePlaceholder;
    let probability: number = 1;

    let initState: string = initStatePlaceholder;
    let discountValue: number;
    let learningRate: number;
    let epsilon: number;
    let horizon: number;
    let maxIterations: number;

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

    function editState(id: string, name: string) {
        // states[id].name = name;
        // states = states;
    }

    function editAction(id: string, name: string) {
        // actions[id].name = name;
        // actions = actions;
    }

    function addReward() {
        if (rewardAction === actionPlaceholder || rewardState === startStatePlaceholder) {
            displayError("Invalid Reward", "Please select an action and state.");
            return;
        } else {
            const rewardId = `${rewardState}-${rewardAction}`;
            if (rewardId in rewards) {
                displayError("Invalid Reward", "This reward already exists.");
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

    function editReward(id: string, value: number) {
        rewards[id].value = value;
        rewards = rewards;
        getModal().close();
    }

    function deleteReward(id: string) {
        delete rewards[id];
        rewards = rewards;
    }

    function addTransition() {
        if (transitionAction === actionPlaceholder || transitionStartState === startStatePlaceholder || transitionEndState === endStatePlaceholder) {
            displayError("Invalid Transition", "Please select an action, start state, and end state.");
            return;
        } else if (probability < 0 || probability > 1) {
            displayError("Invalid Transition", "Probability must be between 0 and 1.");
            return;
        } else {
            const transitionId = `${transitionStartState}-${transitionAction}-${transitionEndState}`;
            if (transitionId in transitions) {
                displayError("Invalid Transition", "This transition already exists.");
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

    function editTransition(id: string, probability: number) {
        if (probability < 0 || probability > 1) {
            displayError("Invalid Transition", "Probability must be between 0 and 1.");
            return;
        }
        console.log(id, probability);
        transitions[id].probability = probability;
        transitions = transitions;
        getModal().close();
    }

    function deleteTransition(id: string) {
        delete transitions[id];
        transitions = transitions;
    }

    function calculate() {
        if (initState === initStatePlaceholder || discountValue === undefined || learningRate === undefined || epsilon === undefined || horizon === undefined || maxIterations === undefined) {
            displayError("Invalid Training Parameters", "Please enter valid training parameters.");
        } else {
            console.log("calculating!");
            // mdp.train({
            //     initState: states[initState],
            //     discountValue: discountValue,
            //     learningRate: learningRate,
            //     epsilon: epsilon,
            //     horizon: horizon,
            //     maxIterations: maxIterations
            // });
        }
        // let discountValue: number;
        // let learningRate: number;
        // let epsilon: number;
        // let horizon: number;
        // let maxIterations: number;
    }

    function displayError(title: string, content: string) {
        alert(title + ": " + content);
        // modalContent = ErrorMessage;
        // modalProps = {title: title, content: content};
        // getModal().open();
    }

    function openInfoModal(content: any) {
        modalContent = content;
        modalProps = {};
        getModal().open();
    }

    function openEditModal(content: any, props: { [key: string]: any }) {
        modalContent = content;
        modalProps = props;
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
    <p>Visualize Markov Decision Processes (MDPs) and calculate their value functions. This is meant to be a supplementary tool to interact with MDPs. If you don't know what a MDP is, I suggest checking out <a href="https://rojagtap.medium.com/understanding-the-markov-decision-process-mdp-8f838510f150">this article</a> then coming back!</p>

    <div class="tool">
        <div class="inputs">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h4 on:click={() => openInfoModal(MDPDefinition)}>
                <span class:icon>&#9432;</span>
                MDP Definition
            </h4>
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
                <input type="text" class:transition bind:value={reward} placeholder="Value" title="Reward Value" />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Action</th>
                        <th>Reward</th>
                        <th>&#9881;</th>
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
                                <div class="edit" on:click={() => openEditModal(EditReward, {})}>&#9998;</div>
                                    <!-- TODO: editReward but open modal first ugghhh -->
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
                        <th>&#9881;</th>
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
                                <div class="edit" on:click={() => openEditModal(EditTransition, {transitions: transitions, transitionID: `${transition.startState.name}-${transition.action.name}-${transition.endState.name}`, editTransition: editTransition})}>&#9998;</div>
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
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h4 on:click={() => openInfoModal(TrainingHyperparameters)}>
                <span class:icon>&#9432;</span>
                Training Hyperparameters
            </h4>
            <div class="hyperparameters">
                <label class:hyperparamLabel for="initState">Initial State</label>
                <select class:hyperparameter bind:value={initState}>
                    <option value={initStatePlaceholder}>{initStatePlaceholder}</option>
                    {#each Object.keys(states) as state}
                        <option value={state}>
                            {state}
                        </option>
                    {/each}
                </select>
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
                <input disabled type="submit" on:click={() => calculate()} value="Calculate" title="Coming Soon!" />
                <input disabled type="submit" on:click={() => console.log("Run Simulation")} value="Run Simulation" title="Coming Soon!" />
            </div>
        </div>
        <div class="viz">
            <div class="graph-title">
                <h3>MDP Graph</h3>
                <!-- TODO: https://js.cytoscape.org/#core/export -->
                <input type="button" class="alarm" on:click={() => clearGraph()} value="Clear" />
            </div>
            <MDPGraph bind:states={states} bind:actions={actions} bind:transitions={transitions} bind:rewards={rewards}/>
        </div>
    </div>
</div>

<Modal>
    <svelte:component this={modalContent} {...modalProps}/>
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
    .icon {
        cursor: pointer;
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