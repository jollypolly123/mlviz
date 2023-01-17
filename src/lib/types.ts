type State = {
    name: string;
    color: string;
}

type States = {
    [id: string]: State;
}

type Action = {
    name: string;
    color: string;
}

type Actions = {
    [id: string]: Action;
}

type Transition = {
    action: Action;
    startState: State;
    endState: State;
    probability: number;
}

type Transitions = {
    [id: string]: Transition;
}

type Reward = {
    state: State;
    action: Action;
    value: number;
}

type Rewards = {
    [id: string]: Reward;
}

type Policy = {
    state: State;
    action: string;
}[];

type Policies = Policy[];

export type { State, States, Action, Actions, Transition, Transitions, Reward, Rewards, Policy, Policies };