const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 6365;

app.use(express.static(path.join(__dirname)));
app.use(express.json()); // Parse JSON request body

app.post('/api/generateDiagram', (req, res) => {
    const transitionTable = req.body.transitionTable;
    const acceptStates = req.body.acceptStates;
    const startState = req.body.startState;
    const dotContent = generateDotFile(transitionTable, acceptStates, startState);
    generatePngFromDot(dotContent, (err, pngData) => {
        if (err) {
            console.error('Error generating PNG:', err);
            res.status(500).send('Error generating PNG');
        } else {
            res.set('Content-Type', 'image/png');
            res.send(pngData);
        }
    });
    function generateDotFile(transitionTable, acceptStates, startState) {
        let dotContent = `digraph DFA {\n`;
        dotContent += `  rankdir=LR;\n`; // Set layout direction to Left to Right
        transitionTable.forEach(([fromState, symbol, toState]) => {
            dotContent += `  "${fromState}" -> "${toState}" [label="${symbol}"];\n`;
        });
        acceptStates.forEach(state => {
            dotContent += `  "${state}" [peripheries=2];\n`; // Double encircle the accept state
        });
        dotContent += `  start [shape=point, width=0.2];\n`; // Define the start node
        dotContent += `  start -> "${startState}" [label="start"];\n`; // Arrow pointing to start state
        dotContent += `}`;
        return dotContent;
    }
    
    function generatePngFromDot(dotContent, callback) {
        const tempDotFile = path.join(__dirname, 'temp.dot');
        const tempPngFile = path.join(__dirname, 'temp.png');
        
        fs.writeFile(tempDotFile, dotContent, err => {
            if (err) {
                callback(err);
                return;
            }
            
            exec(`dot -Tpng -Gdpi=300 "${tempDotFile}" -o "${tempPngFile}"`, (error, stdout, stderr) => {
                if (error) {
                    callback(error);
                    return;
                }
                if (stderr) {
                    callback(stderr);
                    return;
                }
                
                fs.readFile(tempPngFile, (err, data) => {
                    if (err) {
                        callback(err);
                    } else {
                        fs.unlinkSync(tempDotFile);
                        fs.unlinkSync(tempPngFile);
                        callback(null, data);
                    }
                });
            });
        });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});