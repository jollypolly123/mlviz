import type { States, Actions, Transitions } from "$lib/types";

export class MDP {
    states: States;
    actions: Actions;
    transitions: Transitions;

	/**
	 * Create a MDP object from the player's cookie, or initialize a new MDP
	 */
	constructor(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		args: { [key: string]: any } = {}
	) {
		if (Object.prototype.hasOwnProperty.call(args, "serialized")) {
			const [states, actions, transitions] = args.serialized.split('-');
			this.states = JSON.parse(states);
			this.actions = JSON.parse(actions);
			this.transitions = JSON.parse(transitions);
		} else {
			this.states = args.s as States;
			this.actions = args.a as Actions;
			this.transitions = args.t as Transitions;
		}
	}
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	update(category: "states" | "actions" | "transitions", input: any) {
		this[category] = input;
	}

	clear() {
        this.states = {};
        this.transitions = {};
        this.actions = {};
		return;
	}

	/**
	 * Serialize MDP so it can be set as a cookie
	 */
	toString(): string {
		// return `${this.states.join(' ')}
        //         -${this.actions.join(' ')}
        //         -${this.transitions.join(' ')}
        //         -${this.rewards.join(' ')}`;
		return "";
	}
}
