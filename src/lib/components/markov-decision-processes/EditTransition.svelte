<script lang="ts">
    import { onMount } from "svelte";
    import type { Transitions } from "$lib/types";

    export let transitions: Transitions = {};
    export let transitionID: string = "";
    export let editTransition: (transitionID: string, probability: number) => void = () => {};

    let probability: number = 0;

    onMount(() => {
        if (transitionID in transitions) {
            probability = transitions[transitionID].probability;
        }
    });
</script>

<div>
    <h3>Edit Transition</h3>
    {#if transitionID in transitions}
        <div class="attributes">
                <strong class="label">Start State:</strong>
                <span class="value">{transitions[transitionID].startState.name}</span><br/>
                <strong class="label">Action:</strong>
                <span class="value">{transitions[transitionID].action.name}</span><br/>
                <strong class="label">End State:</strong>
                <span class="value">{transitions[transitionID].endState.name}</span><br/>
            <hr/>
            <strong class="label text">Probability:</strong> 
            <input type="text" bind:value={probability} placeholder="Probability" title="Probability" />
        </div>
    {:else}
        <strong>Transition not found.</strong> Please try again.<br/>
    {/if}
    <br/>
    <input type="button" class="info" on:click={() => editTransition(transitionID, probability)} value="Done" />
</div>

<style>
    .attributes {
        display: inline-block;
    }
    .label {
        float: left;
        margin-right: 2vw;
    }
    .text {
        margin-top: 0.7em;
    }
    .value {
        float: right;
    }
    input[type="text"] {
        width: 4vw;
    }
</style>