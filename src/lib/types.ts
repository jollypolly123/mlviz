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
    reward: number;
}

type Transitions = {
    [id: string]: Transition;
}

export type { State, States, Action, Actions, Transition, Transitions }