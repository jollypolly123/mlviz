import { MDP } from './mdp';
import type { PageServerLoad, Actions } from './$types';

export const load = (({ cookies }) => {
	const graph = new MDP(cookies.get('markovdecisionprocess'));

	return {
		states: graph.states,
		actions: graph.actions,
		transitions: graph.transitions
	};
}) satisfies PageServerLoad;

export const actions = {
	// /**
	//  * Modify game state in reaction to a keypress. If client-side JavaScript
	//  * is available, this will happen in the browser instead of here
	//  */
	// update: async ({ request, cookies }) => {
	// 	const graph = new MDP(cookies.get('markovdecisionprocess'));

	// 	const data = await request.formData();
	// 	const key = data.get('key');

	// 	const i = game.answers.length;

	// 	if (key === 'backspace') {
	// 		game.guesses[i] = game.guesses[i].slice(0, -1);
	// 	} else {
	// 		game.guesses[i] += key;
	// 	}

	// 	cookies.set('markovdecisionprocess', graph.toString());
	// },

	// /**
	//  * Modify game state in reaction to a guessed word. This logic always runs on
	//  * the server, so that people can't cheat by peeking at the JavaScript
	//  */
	// enter: async ({ request, cookies }) => {
	// 	const graph = new MDPGraph(cookies.get('markovdecisionprocess'));

	// 	const data = await request.formData();
	// 	const guess = data.getAll('guess')  as string[];

	// 	cookies.set('markovdecisionprocess', graph.toString());
	// },

	// restart: async ({ cookies }) => {
	// 	cookies.delete('markovdecisionprocess');
	// }
} satisfies Actions;
