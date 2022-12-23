<script lang="ts">
    import { onMount } from "svelte";

    export let tags: { [id: string]: any };
    export let placeholder: string = "";
    export let title: string = "";
    export let hover: string = "";
    export let color: boolean = false;

    let tagInput: HTMLInputElement;
    let tagList: HTMLDivElement;

    const inputClass = true;

    const addTag = (tag: string) => {
        if (tag && !(tags.hasOwnProperty(tag))) {
            tags[tag] = {name: tag};
            if (color) tags[tag]["color"] = "#000000";
            tagInput.value = "";
        }
    };

    const removeTag = (tag: string) => {
        for (const t of Object.keys(tags)) {
            if (t === tag) {
                delete tags[t];
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            addTag(tagInput.value);
        }
    };

    const handleTagClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // open modal to edit or delete tag

        // removeTag(target.innerText.trim());
    };

    const handleColorChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const color = target.value;
        const tag = target.parentElement!.innerText.trim();
        tags[tag]["color"] = color;
        console.log(tag, color);
    };

    onMount(() => {
        tagList.addEventListener("click", handleTagClick);
        tagInput.addEventListener("keydown", handleKeyDown);
    });
</script>

<div class:inputClass>
    {#if title}
        <label for="tagInput">{title}</label>
    {/if}
    <input type="text" bind:this={tagInput} placeholder={placeholder} title={hover} />
</div>
<div bind:this={tagList} class:tagList>
    {#each Object.keys(tags) as tag}
        <span class:tag>
            {tag}
            {#if color}
            <input type="color" on:change={(e) => handleColorChange(e)}/>
            {/if}
        </span>
    {/each}
</div>

<style>
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
