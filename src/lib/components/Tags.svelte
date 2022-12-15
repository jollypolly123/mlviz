<script lang="ts">
    import { onMount } from "svelte";

    export let tags: string[];
    export let placeholder: string = "";

    let tagInput: HTMLInputElement;
    let tagList: HTMLDivElement;

    const addTag = (tag: string) => {
        tags = [...tags, tag];
        tagInput.value = "";
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
        if (target.tagName === "DIV") {
            removeTag(target.innerText);
        }
    };

    onMount(() => {
        tagList.addEventListener("click", handleTagClick);
        tagInput.addEventListener("keydown", handleKeyDown);
    });
</script>

<div>
    <input type="text" bind:this={tagInput} placeholder={placeholder} />
    <div bind:this={tagList}>
        {#each tags as tag}
            <div>{tag}</div>
        {/each}
    </div>
</div>

<style>
</style>
