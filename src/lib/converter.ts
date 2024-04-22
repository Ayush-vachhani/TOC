let DOTSCRIPTHEADER = 'digraph finite_state_machine {\n' + '  rankdir = LR;\n';
let DOTSCRIPTEND = '}\n';

function escapeCharacter(token: string): string {
    switch (token) {
        case ' ':
            return '[space]';
        case '\n':
            return '\\\\n';
        case '\t':
            return '\\\\t';
        case '\r':
            return '\\\\r';
        case '\\':
            return '[\\\\]';
    }
    return token;
}

export function toDotScript(fsm: any): string {
    let transitionDotScript = '  node [shape = circle];\n';
    for (let from_id in fsm.transitions) {
        for (let to_id in fsm.transitions[from_id]) {
            transitionDotScript += '  ' + [from_id] + '->' + to_id + ' [label="' +
                escapeCharacter(fsm.transitions[from_id][to_id]) + '"];\n';
        }
    }
    let initialStatesDotScript = '';
    let initialStatesStartDotScript = '  node [shape = plaintext];\n';
    let acceptStatesDotScript = '';

    initialStatesDotScript += `  ${fsm.initialState} [shape = circle];\n`;
    initialStatesStartDotScript += `  "" -> ${fsm.initialState} [label = "start"];\n`;

    for (let acceptState of fsm.acceptStates) {
        acceptStatesDotScript += `  ${acceptState} [shape = doublecircle];\n`;
    }

    for (let i = 0; i < fsm.numOfStates; ++i) {
        if (fsm.acceptStates.indexOf(i.toString()) != -1) {
            acceptStatesDotScript += '  node [shape = doublecircle]; ' + i + ';\n';
        }
        if (fsm.initialState == i.toString()) {
            initialStatesStartDotScript += '  "" -> ' + i + ' [label = "start"];\n';
            // accept is higher priority than initial state.
            if (fsm.acceptStates.indexOf(i.toString()) == -1)
                initialStatesDotScript += '  node [shape = circle]; ' + i + ';\n';
        }
    }
    return DOTSCRIPTHEADER + initialStatesDotScript + acceptStatesDotScript +
        initialStatesStartDotScript + transitionDotScript + DOTSCRIPTEND;
}