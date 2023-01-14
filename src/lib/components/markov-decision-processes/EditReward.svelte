<script lang="ts">
    import { onMount } from "svelte";
    import type { Rewards } from "$lib/types";

    export let rewards: Rewards = {};
    export let rewardID: string = "";
    export let editReward: (rewardID: string, value: number) => void = () => {};

    let value: number = 0;

    onMount(() => {
        if (rewardID in rewards) {
            value = rewards[rewardID].value;
        }
    });
</script>

<div>
    <h3>Edit Transition</h3>
    {#if rewardID in rewards}
        <div class="attributes">
                <strong class="label">Start State:</strong>
                <span class="value">{rewards[rewardID].state.name}</span><br/>
                <strong class="label">Action:</strong>
                <span class="value">{rewards[rewardID].action.name}</span><br/>
            <hr/>
            <strong class="label text">Value:</strong> 
            <input type="text" bind:value={value} placeholder="Value" title="Reward Value" />
        </div>
    {:else}
        <strong>Reward not found.</strong> Please try again.<br/>
    {/if}
    <br/>
    <input type="button" class="info" on:click={() => editReward(rewardID, value)} value="Done" />
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