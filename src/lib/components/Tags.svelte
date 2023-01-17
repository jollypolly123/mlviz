<script lang="ts">
    import { onMount } from "svelte";

    export let tags: { [id: string]: any };
    export let placeholder: string = "";
    export let title: string = "";
    export let hover: string = "";
    export let color: boolean = false;
    export let deletable: boolean = false;
    export let handleTagClick: (e: Event) => void = () => {};

    let tagInput: HTMLInputElement;
    let tagList: HTMLDivElement;

    const inputClass = true;

    const addTag = (tag: string) => {
        if (tag && !(tags.hasOwnProperty(tag)) && !tag.includes("-")) {
            tags[tag] = {name: tag};
            if (color) tags[tag]["color"] = "#000000";
            tagInput.value = "";
        } else if (!(tags.hasOwnProperty(tag))) {
            alert("Tag already exists");
        } else if (tag.includes("-")) {
            alert("Tag must not contain the character '-'");
        }
    };

    const removeTag = (tag: string) => {
        for (const t of Object.keys(tags)) {
            if (t === tag) {
                delete tags[t];
            }
        }
        tags = tags;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            addTag(tagInput.value);
        }
    };

    const handleColorChange = (e: Event, tag: string) => {
        const target = e.target as HTMLInputElement;
        const color = target.value;
        tags[tag]["color"] = color;
    };

    onMount(() => {
        tagList.addEventListener("click", handleTagClick);
        tagInput.addEventListener("keydown", handleKeyDown);
    });
</script>

<div class:inputClass>
    {#if title}
        <label for="tagInput" class="title">{title}</label>
    {/if}
    <input type="text" bind:this={tagInput} placeholder={placeholder} title={hover} />
</div>
<div bind:this={tagList} class:tagList>
    {#each Object.keys(tags) as tag}
        <span class:tag>
            {tag}
            {#if color}
            <input type="color" on:change={(e) => handleColorChange(e, tag)}/>
            {/if}
            {#if deletable}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span style="cursor: pointer" on:click={() => removeTag(tag)}>&#8855;</span>
            {/if}
        </span>
    {/each}
</div>

<style>
    .title {
        margin-right: .5rem;
    }
    .inputClass {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    input[type="color"] {
        height: 1.2rem;
        width: 1.2rem;
        padding: 0;
        border: none;
        background-color: transparent;
    }
    .tagList {
        display: flex;
        flex-wrap: wrap;
        margin: 5px;
    }
    .tag {
        background-color: var(--color-bg-1);
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
        overflow-x: hidden;
        overflow-wrap: break-word;
    }
</style>
