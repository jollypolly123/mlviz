type State = {
    name: string;
    color: string;
}

type States = {
    [id: string]: State;
}

type Action = {
    name: string;
}

type Transition = {
    action: Action;
    startState: State;
    endState: State;
    probability: number;
}

export type { State, States, Action, Transition }