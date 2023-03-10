<script context="module" lang="ts">
	let onTop: HTMLDivElement | null   //keeping track of which open modal is on top
	const modals: { [id: string]: any } = {};  //all modals get registered here for easy future access
	
	// 	returns an object for the modal specified by `id`, which contains the API functions (`open` and `close` )
	export function getModal(id=''){
		return modals[id]
	}
</script>

<script lang="ts">
    import { onMount } from 'svelte'
        
    let topDiv: HTMLDivElement
    let visible = false
    let prevOnTop: HTMLDivElement | null
    let closeCallback: (arg0: any) => void

    export let id=''

    function keyPress(ev: { key: string; }){
        //only respond if the current modal is the top one
        if(ev.key=="Escape" && onTop==topDiv) close('') //ESC
    }

    /**  API **/
    function open(callback: (//<reference types="svelte" />
			arg0: any) => void) {
        closeCallback=callback
        if(visible) return
        prevOnTop=onTop
        onTop=topDiv
        window.addEventListener("keydown", keyPress)
        
        //this prevents scrolling of the main window on larger screens
        document.body.style.overflow="hidden" 

        visible=true

        //Move the modal in the DOM to be the last child of <BODY> so that it can be on top of everything
        document.body.appendChild(topDiv)
    }
        
    function close(retVal: string){
        if(!visible) return
        window.removeEventListener("keydown",keyPress)
        onTop=prevOnTop
        if(onTop==null) document.body.style.overflow=""
        visible=false
        if(closeCallback) closeCallback(retVal)
    }
        
    //expose the API
    modals[id]={ open, close }
    
	onMount(()=>{
		return () => {
			delete modals[id]
        	window.removeEventListener("keydown",keyPress)
		}
	})
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="topModal" class:visible bind:this={topDiv} on:click={() => close('')}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id='modal' on:click|stopPropagation={() => {}}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg id="close" on:click={() => close('')} viewBox="0 0 12 12">
			<circle cx=6 cy=6 r=6 />
			<line x1=3 y1=3 x2=9 y2=9 />
			<line x1=9 y1=3 x2=3 y2=9 />
		</svg>
		<div id='modal-content'>
			<slot></slot>
		</div>
	</div>
</div>

<style>
	#topModal {
		visibility: hidden;
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #4448;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#modal {
		position: relative;
		border-radius: 6px;
		background: white;
        border: 2px solid #000;
		filter: drop-shadow(5px 5px 5px #555);
		max-width: 90vw;
		padding: 1em;
	}

	.visible {
		visibility: visible !important;
	}

	#close {
		position: absolute;
		top:-12px;
		right:-12px;
		width:24px;
		height:24px;
		cursor: pointer;
		fill: var(--color-alert);
		transition: transform 0.3s;
	}

	#close:hover {
		transform: scale(1.2);
	}

	#close line {
		stroke:#FFF;
		stroke-width:2;
	}

	#modal-content {
		max-width: calc(100vw - 20px);
		max-height: calc(100vh - 20px);
		overflow: auto;
	}
</style>