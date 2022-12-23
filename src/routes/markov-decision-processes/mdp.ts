import type { States, Actions, Transitions, Rewards } from "$lib/types";

export class MDP {
    states: States;
    actions: Actions;
    transitions: Transitions;
	rewards: Rewards;

	/**
	 * Create a MDP object from the player's cookie, or initialize a new MDP
	 */
	constructor(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		args: { [key: string]: any } = {}
	) {
		if (Object.prototype.hasOwnProperty.call(args, "serialized")) {
			const [states, actions, transitions, rewards] = args.serialized.split('-');
			this.states = JSON.parse(states);
			this.actions = JSON.parse(actions);
			this.transitions = JSON.parse(transitions);
			this.rewards = JSON.parse(rewards);
		} else {
			this.states = args.s as States;
			this.actions = args.a as Actions;
			this.transitions = args.t as Transitions;
			this.rewards = args.r as Rewards;
		}
	}
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	update(category: "states" | "actions" | "transitions" | "rewards", input: any) {
		this[category] = input;
	}

	clear() {
        this.states = {};
        this.transitions = {};
        this.actions = {};
		this.rewards = {};
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
