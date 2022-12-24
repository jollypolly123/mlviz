<script lang="ts">
    import Modal from "./Modal.svelte";

    export let title = "";
    export let content = "";
</script>

<Modal>
    <h4>{title}</h4>
    <p>{content}</p>
</Modal>