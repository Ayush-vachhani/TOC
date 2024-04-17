// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
interface FSMJSON {
	initialState: string;
	acceptStates: string[];
	numOfStates: number;
	type: string;
	transitions: { [fromState: string]: { [toState: string]: string } };
}
export {FSMJSON};
