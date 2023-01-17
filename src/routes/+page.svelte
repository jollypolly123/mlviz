<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<!-- <picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture> -->
			Welcome
		</span>
	</h1>

	<div class="text-column">
		<p>
			I took 6.3900 (6.036) <strong>Introduction to Machine Learning</strong> at MIT in the Fall of 2022. This is a collection of tools I made for fun to help practice the concepts we learned in class (<a href="https://introml.mit.edu/_static/fall22/LectureNotes/6_390_lecture_notes_fall2022.pdf">full notes here</a>). The topics we covered were (in order):
		</p>
	
		<ol>
			<li><a href="/regression">Regression</a></li>
			<li>Gradient Descent</li>
			<li>Classifiers and Logistic Regression</li>
			<li><a href="/feature-representation">Features</a></li>
			<li><a href="/clustering">Clustering</a></li>
			<li>Neural Networks</li>
			<li>Convolutional Neural Networks</li>
			<li>State Machines and RNNs</li>
			<li><a href="/markov-decision-processes">Markov Decision Processes</a></li>
			<li>Reinforcement Learning</li>
			<li>Decision Trees and Nearest Neighbor</li>
		</ol>
	
		<p>
			You can click the items in the list above to check out a tool I made for each topic. They provide visualizations and allow you to do calculations. I hope you find them useful!
		</p>
	
	</div>	
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	/* .welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	} */
</style>
