<script lang="ts">
    import { onMount } from "svelte";

    export let tags: string[];
    export let placeholder: string = "";
    export let title: string = "";

    let tagInput: HTMLInputElement;
    let tagList: HTMLDivElement;

    const addTag = (tag: string) => {
        if (tag) {
            tags = [...tags, tag];
            tagInput.value = "";
        }
    };

    const removeTag = (tag: string) => {
        tags = tags.filter((t) => t !== tag);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            addTag(tagInput.value);
        }
    };

    const handleTagClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // if (target.tagName === "DIV") {
        //     removeTag(target.innerText);
        // }
    };

    onMount(() => {
        tagList.addEventListener("click", handleTagClick);
        tagInput.addEventListener("keydown", handleKeyDown);
    });
</script>

<div>
    <input type="text" bind:this={tagInput} placeholder={placeholder} title={title} />
    <div bind:this={tagList} class:tagList>
        {#each tags as tag}
            <span class:tag>{tag}<input type="color"/></span>
        {/each}
    </div>
</div>

<style>
    .tagList {
        display: flex;
        flex-wrap: wrap;
    }
    .tag {
        background-color: var(--color-bg-1);
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
    }
    input[type="color"] {
        height: 1.2rem;
        width: 1.2rem;
        padding: 0;
        border: none;
        background-color: transparent;
        margin-left: 5px;
    }
</style>
