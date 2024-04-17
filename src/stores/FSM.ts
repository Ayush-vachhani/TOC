import { writable } from 'svelte/store';
import type {Writable} from "svelte/store";
import type {FSMJSON} from "../app";
// Define the initial FSM JSON
const initialFSM = {
    initialState: 'a',
    acceptStates: ['b', 'c'],
    numOfStates: 2,
    type: 'DFA',
    transitions: {
        'a': { 'b': '1', 'a': '0' },
        'b': { 'a': '0', 'c': 'ε' }
    }
};

export const FSM:Writable<FSMJSON> = writable(initialFSM);

export function removeTransition(fromState: string, toState: string):void {
    FSM.update(fsm => {
        delete fsm.transitions[fromState][toState];
        return fsm;
    });
}

export function addTransition(fromState: string, toState: string, label: string):void {
    FSM.update(fsm => {
        if (!fsm.transitions[fromState]) {
            fsm.transitions[fromState] = {};
        }
        fsm.transitions[fromState][toState] = label;
        return fsm;
    });
}

export function addFinalState(state: string|null): void {
    FSM.update(fsm => {
        if (!fsm.acceptStates.includes(<string>state)) {
            // @ts-ignore
            fsm.acceptStates = [...fsm.acceptStates, state];
        }
        return fsm;
    });
}

export function removeFinalState(state: string): void {
    FSM.update(fsm => {
        // Remove the state from acceptStates
        fsm.acceptStates = fsm.acceptStates.filter(s => s !== state);
        return fsm;
    });
}
