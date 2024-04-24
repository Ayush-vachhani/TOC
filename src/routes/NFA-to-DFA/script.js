var eclosureArr = []; // Global array for storing e_closure for each state
var buffer_array = []; //Global array for storing the next state outputs
var visited_array = []; //Global array for storing the visited states
var DFA_accept_states = []; //Global array for storing the DFA's accept states
var DFA_TRANSITION_TABLE = [];
var ACCEPT_STATES = [];
let table1 = document.getElementById('output_panel_table1'); //table1 global access
let table2 = document.getElementById('output_panel_table2'); //table2 global access
let dfaDetailsDiv = document.getElementById('DFA_details'); //dfaDetailsDiv global access
let DFA_transition_diagram = document.getElementById('png_div'); //DFA_transition_diagram global access
let hidebutton = document.getElementById("hide_the_button");

// JavaScript function to validate the input
function validate() {
    let inputValue_states = document.getElementById('statesInput').value.trim();
    let statesInput = inputValue_states === '' ? [] : inputValue_states.split(',');
    
    let inputValue_startstate = document.getElementById('startStateInput').value.trim();
    let startStateInput = inputValue_startstate === '' ? [] : inputValue_startstate;

    let inputValue_acceptstates = document.getElementById('acceptStatesInput').value.trim();
    let acceptStatesInput = inputValue_acceptstates === '' ? [] : inputValue_acceptstates.split(',');

    let inputValue_alphabet = document.getElementById('alphabetInput').value.trim();
    let alphabetInput = inputValue_alphabet === '' ? [] : inputValue_alphabet.split(',');
    
    let inputValue_transition_table = document.getElementById('transitionTableInput').value.trim();
    let transitionTableInput = inputValue_transition_table === '' ? [] : inputValue_transition_table.split("\n");
    let arr = transitionTableInput.map(entry => entry.split(','));
    
    // console.log(statesInput)
    // console.log(startStateInput)
    // console.log(acceptStatesInput)
    // console.log(alphabetInput)
    // console.log(arr)
    
    // Clear existing validation messages
    document.querySelectorAll('.validation-message').forEach(element => {
        element.textContent = ''; // Clear the content
    });

    // Check  if states and alphabet are empty
    if (statesInput.length === 0) {
        alert("Please enter at least one \"NFA STATE\" in NFA States.");
        return false;
    }
    else if (alphabetInput.length === 0) {
        alert("Please enter at least one \"ALPHABET\" in NFA Alphabet Set.");
        return false;
    }
    else if (startStateInput.length === 0) {
        alert( "Start State can't be empty." );
        return false;
    }
    else if (acceptStatesInput.length === 0) {
        alert("Accept States can't be empty.");
        return false;
    }
    else if (transitionTableInput.length === 0) {
        alert("Please enter at least one \"NFA TRANSITION\" in NFA Transition Table.");
        return false;
    }
    else if (transitionTableInput.length > 0) {
        for (let innerArr of arr) {
            if (innerArr.length !== 3){
                alert("Each transition must be a CSV of 3 values ONLY.");
                return false;
            }
        }
        
        let isValid = true;
        
        // Validation for Start State
        let invalid_ss1 = [];
        let invalid_ss2 = [];
        let ss1_flag = false;
        for (let i of arr) {
            if (i[0] == startStateInput){
                ss1_flag = true;
                break;
            }
        }
        if (ss1_flag == false) {
            isValid = false;
            if (!invalid_ss1.includes(startStateInput)){
                invalid_ss1.push(startStateInput);
            }
        }
        if (!statesInput.includes(startStateInput)){
            isValid = false;
            if (!invalid_ss2.includes(startStateInput)){
                invalid_ss2.push(startStateInput);
            }
        }
    
        // Display the list of invalid start state
        if (invalid_ss1.length > 0) {
            let message = document.getElementById('ss1_validation_message');
            message.textContent = "State " + invalid_ss1.join(', ') + " must be in atleast one of NFA Transition's start state";
            message.appendChild(document.createElement('br'));
        }
        if (invalid_ss2.length > 0) {
            let message = document.getElementById('ss2_validation_message');
            message.textContent = "State " + invalid_ss2.join(', ') + " must be in NFA states";
            message.appendChild(document.createElement('br'));
        }
        
        // Validation for Accept States
        let invalid_as1 = [];
        let invalid_as2 = [];
        for (let j of acceptStatesInput) {
            let as1_flag = false;
            for (let i of arr) {
                if (i[2] == j){
                    as1_flag=true;
                }
            }
            if (as1_flag == false) {
                isValid = false;
                if (!invalid_as1.includes(j)){
                    invalid_as1.push(j);
                }
            }
        }
        for (let j of acceptStatesInput) {
            if (!statesInput.includes(j)){
                isValid = false;
                if (!invalid_as2.includes(j)){
                    invalid_as2.push(j);
                }
            }
        }
    
        // Display the list of invalid accept states
        if (invalid_as1.length > 0) {
            let message = document.getElementById('as1_validation_message');
            message.textContent = "State " + invalid_as1.join(', ') + " must be in atleast one of NFA Transition's accept state";
            message.appendChild(document.createElement('br'));
        }
        if (invalid_as2.length > 0) {
            let message = document.getElementById('as2_validation_message');
            message.textContent = "State " + invalid_as2.join(', ') + " must be in NFA states";
            message.appendChild(document.createElement('br'));
        }
        
        // Validation for alphabetInput
        let invalidAlphabets = []; // Array to store invalid alphabets
        
        for (let i of arr) {
            if (i[1] !== 'e' && !alphabetInput.includes(i[1])) {
                isValid = false;
                if (!invalidAlphabets.includes(i[1])) {
                    invalidAlphabets.push(i[1]); // Add the invalid alphabet to the array
                }
            }
        }
        
        // Display the list of invalid alphabets
        if (invalidAlphabets.length > 0) {
            let message = document.getElementById('alp_validation_message');
            message.textContent = "Invalid alphabets: " + invalidAlphabets.join(', ') + " (Not defined in Alphabet Set)";
            message.appendChild(document.createElement('br'));
        }
        
        
        // Validation for statesInput
        let invalidStates = []; // Array to store invalid alphabets
        for (let i of arr) {
            if (!statesInput.includes(i[0])) {
                isValid = false;
                if (!invalidStates.includes(i[0])){
                    invalidStates.push(i[0]);
                }
            }
            if (!statesInput.includes(i[2])) {
                isValid = false;
                if (!invalidStates.includes(i[2])){
                    invalidStates.push(i[2]);
                }
            }
        }
        
        // Display the list of invalid states
        if (invalidStates.length > 0) {
            let message = document.getElementById('st_validation_message');
            message.textContent = "Invalid States: " + invalidStates.join(', ') + " (Not defined in NFA states)";
            message.appendChild(document.createElement('br'));
        }
        
        
        // console.log(isValid, 'Is valid?');
        return isValid;
    }
}

// JavaScript function to find epsilon closure
function findEclosure() {
    eclosureArr.length = 0; // Clear the array before starting
    // Hide all the output details
    table1.style.display = 'none';
    table2.style.display = 'none';
    dfaDetailsDiv.style.display = 'none';
    DFA_transition_diagram.style.display = 'none';
    // validate the inputs and if valid proceed
    if (validate()) {
        let statesInput = document.getElementById('statesInput').value.split(',');
        let transitionTableInput = document.getElementById('transitionTableInput').value.trim().split("\n");
        let arr = transitionTableInput.map(entry => entry.split(','));
        findEclosureHelper(arr, statesInput);
        
        // Show the table1
        table1.style.display = 'table';
        // Hide the table2
        table2.style.display = 'none';
        //Hide DFA details
        dfaDetailsDiv.style.display = 'none';
        //Hide diagram
        DFA_transition_diagram.style.display = 'none';
        
        // Get table body
        let table1Body = table1.getElementsByTagName('tbody')[0];
        table1Body.innerHTML = '';
        
        // Populate the table
        eclosureArr.forEach(innerArr => {
            let row = table1Body.insertRow();
            let stateCell = row.insertCell(0);
            let closureCell = row.insertCell(1);
            stateCell.textContent = innerArr[0];
            closureCell.textContent = innerArr;
        });
    }
}

// JavaScript function to find epsilon closure
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

// Javascript function to return eclosure of a given state
/**
 * Returns the ε-closure for a given state.
 * @param {string} state The state for which to find the ε-closure.
 * @returns {Array<string>} The ε-closure for the given state, represented as an array of strings (states).
 */
function getE_closure(state) {
    for (let innerArr of eclosureArr) {
        if (innerArr[0] == state) {
            return innerArr;
        }
    }
    return []; // Returning an empty array if the state is not found
}

// function to check if 2 sets are equal or not
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
    let statesInput = document.getElementById('statesInput').value.split(',');
    
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


function convert_to_DFA() { 
    visited_array.length = 0;
    buffer_array.length = 0;
    DFA_TRANSITION_TABLE.length = 0;
    ACCEPT_STATES.length = 0;
    let statesInput = document.getElementById('statesInput').value.split(',');
    let startStateInput = document.getElementById('startStateInput').value;
    let acceptStatesInput = document.getElementById('acceptStatesInput').value.split(',');
    let alphabetInput = document.getElementById('alphabetInput').value.split(',');
    // console.log(alphabetInput);
    let transitionTableInput = document.getElementById('transitionTableInput').value.trim().split("\n");
    let arr = transitionTableInput.map(entry => entry.split(','));
    // console.log(arr);
    table1.style.display = 'none';
    table2.style.display = 'none';
    dfaDetailsDiv.style.display = 'none';
    DFA_transition_diagram.style.display = 'none';
    if (validate()) {
        findEclosureHelper(arr, statesInput, alphabetInput);
        // Hide the table1
        table1.style.display = 'none';
        // Show the table2
        table2.style.display = 'table';
        //Show DFA details
        dfaDetailsDiv.style.display = 'block';
        //Hide diagram
        DFA_transition_diagram.style.display = 'none';
        
        let table2Body = table2.getElementsByTagName('tbody')[0];
        table2Body.innerHTML = '';

        let display_start_state = document.getElementById('start_state');
        let closure = getE_closure(startStateInput);
        display_start_state.innerHTML = '{' + closure.join(",") + '}';

        visited_array.push(getE_closure(startStateInput));
        buffer_array.push(getE_closure(startStateInput));

        while (buffer_array.length > 0) {
            let poppedArray = buffer_array.shift(); // Pop the first array from buffer_array
            for (let alphabet of alphabetInput) {
                let temp_inner_array = []
                let row = table2Body.insertRow();
                let stateCell = row.insertCell(0);
                let alphabetCell = row.insertCell(1);
                let nextstateCell = row.insertCell(2);
                stateCell.textContent = '{' + poppedArray.join(',') + '}';
                // console.log("popped array" + poppedArray);
                alphabetCell.textContent = alphabet;
                // console.log("alphabet" + alphabet);
                // console.log("transition array" + arr);
                nextstateCell.textContent = '{' + Array.from(DFA_transition(poppedArray, alphabet, arr)).join(',') + '}';
                temp_inner_array.push(stateCell.textContent);
                temp_inner_array.push(alphabetCell.textContent);
                temp_inner_array.push(nextstateCell.textContent);
                DFA_TRANSITION_TABLE.push(temp_inner_array);
            }
        }

        let DFA_Detail_Table = document.getElementById("DFA_Detail_Table");
        let acceptstatesbody = DFA_Detail_Table.getElementsByTagName('td')[1];
        acceptstatesbody.innerHTML = '';
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
            let para = document.createElement('p');
            para.appendChild(document.createTextNode('{' + as.join(',') + '}'));
            acceptstatesbody.appendChild(para);
            ACCEPT_STATES.push('{' + as.join(',') + '}');
        }
    }
    hidebutton.style.display = "block";
    // console.log(visited_array)
    // console.log(buffer_array)
    console.log(DFA_TRANSITION_TABLE)
    console.log(ACCEPT_STATES)
}

// function to clear the values and reload the page with a confirm prompt
function clearAll() {
    let isTrue = confirm("Are you sure to clear all the values and refresh the page?")
    if (isTrue == true) {
        location.reload();
    }
    else {
        return false;
    }
}

// function to display diagram
function displayDiagram() {
    hidebutton.style.display = "none";
    DFA_transition_diagram.style.display ='flex';
    DFA_transition_diagram.style.justifyContent ='center';
    let startStateInput = document.getElementById('startStateInput').value;
    console.log(startStateInput)

    fetch('http://localhost:6365/api/generateDiagram', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            transitionTable: DFA_TRANSITION_TABLE,
            acceptStates: ACCEPT_STATES, // Assuming ACCEPT_STATES is an array containing the accept states
            startState: "{" + getE_closure(startStateInput).join(',') + "}"
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error sending transition table to server');
        }
        return response.blob();
    })
    .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = objectURL;
        img.style.maxWidth = '70vmax';
        // Clear the contents of the div
        DFA_transition_diagram.innerHTML = '';
        // Append the image to the div
        DFA_transition_diagram.appendChild(img);
    })
    .catch(error => console.error('Error sending transition table:', error));
}
