// Usage example
const NFA_JSON = {
    initialState: 'Q0',
    acceptStates: ['Q4'],
    statesInput: ['Q0','Q1','Q2','Q3','Q4'],
    alphabetSet: ['0','1'],
    transitions: [['Q0','e','Q1'], ['Q0','e','Q2'], ['Q1','0','Q3'], ['Q2','1','Q3'], ['Q3','1','Q4']]
};

function convert_to_DFA(NFA_JSON) {
    var eclosureArr = []; // Global array for storing e_closure for each state
    var buffer_array = []; // Global array for storing the next state outputs
    var visited_array = []; // Global array for storing the visited states
    var DFA_accept_states = []; // Global array for storing the DFA's accept states
    var DFA_TRANSITION_TABLE = [];
    var ACCEPT_STATES = [];

    // Extract information from the provided JSON object
    let startStateInput = NFA_JSON.initialState;
    let acceptStatesInput = NFA_JSON.acceptStates;
    let statesInput = NFA_JSON.statesInput;
    let alphabetInput = NFA_JSON.alphabetSet;
    let transitionTableInput = NFA_JSON.transitions;

    // Define the findEclosureHelper function
    function findEclosureHelper(arr, states_set) {
        states_set.forEach(state => {
            eclosureArr.push([state])
        });
        
        arr.forEach(innerArr => {
            // if transition symbol is 'e' then add the final state to eclosure
            if (innerArr[1] === 'e') {
                eclosureArr.forEach(search => {
                    if (search.includes(innerArr[0])) {
                        if (!search.includes(innerArr[2])) {
                            search.push(innerArr[2]);
                        }
                    }
                });
            }
        });
    }

    function getE_closure(state) {
        for (let innerArr of eclosureArr) {
            if (innerArr[0] == state) {
                return innerArr;
            }
        }
        return []; // Returning an empty array if the state is not found
    }

    function areSetsEqual(set1, set2) {
        if (set1.size !== set2.size) {
            return false;
        }
        for (let value of set1) {
            if (!set2.has(value)) {
                return false;
            }
        }
        return true;
    }
    
    function DFA_transition(poppedArray, alp, arr) {
        let temp_array = new Set();
        let temp2_array = new Set();
        
        // console.log(poppedArray);
        // console.log(alp);
        // console.log(arr);
        
        // Loop through each state in poppedArray
        for (let s of poppedArray) {
            // console.log(s);
            // Find matching transitions in arr
            for (let innerArr of arr) {
                // console.log(innerArr[1]);
                if (innerArr[0] === s && innerArr[1] === alp) {
                    if (!temp2_array.has(innerArr[2])) {
                        let closure = getE_closure(innerArr[2]);
                        for (let state of closure) {
                            temp2_array.add(state);
                        }
                    }
                }
            }
        }
        for (let st of statesInput) {
            if (temp2_array.has(st)) {
                temp_array.add(st);
            }
        }
        
        if (temp_array.size === 0) {
            temp_array.add("φ");
        } else {
            let flag_to_add = 1;
            for (let v of visited_array) {
                // console.log(v);
                let set_v = new Set(v);
                // console.log(set_v);
                // console.log(Array.from(temp_array));
                if (areSetsEqual(set_v, temp_array)) {
                    flag_to_add = 0;
                }
            }
            if (flag_to_add === 1) {
                visited_array.push(Array.from(temp_array));
                buffer_array.push(Array.from(temp_array));
            }
        }
        // console.log(temp_array);
        return temp_array;
    }

    // Call the findEclosureHelper function
    findEclosureHelper(transitionTableInput, statesInput);
    let closure = getE_closure(startStateInput);

    visited_array.push(getE_closure(startStateInput));
    buffer_array.push(getE_closure(startStateInput));

    while (buffer_array.length > 0) {
        let poppedArray = buffer_array.shift(); // Pop the first array from buffer_array
        for (let alphabet of alphabetInput) {
            let temp_inner_array = [];
            let stateCell = poppedArray.join(',');
            let alphabetCell = alphabet;
            let nextstateCell =  Array.from(DFA_transition(poppedArray, alphabet, transitionTableInput)).join(',');
            temp_inner_array.push(stateCell);
            temp_inner_array.push(alphabetCell);
            temp_inner_array.push(nextstateCell);
            DFA_TRANSITION_TABLE.push(temp_inner_array);
        }
    }

    DFA_accept_states.length = 0;
    for (let as of acceptStatesInput) {
        for (let cs of visited_array) {
            if (cs.includes(as)) {
                DFA_accept_states.push(cs);
            }
        }
    }
    // console.log(DFA_accept_states);
    for (let as of DFA_accept_states) {
        ACCEPT_STATES.push(as.join(','));
    }

    // console.log(DFA_TRANSITION_TABLE);
    // Construct the output JSON object
    let DFA_output = {
        startState: startStateInput,
        finalStates: ACCEPT_STATES,
        transitions: DFA_TRANSITION_TABLE
    };

    return DFA_output;
}

const DFA_output = convert_to_DFA(NFA_JSON);
console.log(DFA_output); // Output the resulting DFA JSON object
