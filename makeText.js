/** Command-line tool to generate Markov text. */
const fs = require('fs');
const {MarkovMachine} = require('./markov');
const axios = require('axios');


const outputText = async ()=>{

    const pathtype = process.argv[2];
    const path = process.argv[3];

    if (pathtype === 'file'){
        fs.readFile('eggs.txt', 'utf8', (err,data) => {
            if (err){
                console.log(`Error reading ${path}: ${err}`);
                process.exit(1);
            } else {
                const machine = new MarkovMachine(data);
                console.log(machine.makeText());
            }
        });
    } else {
        try{
            const resp = await axios.get(path);
            const machine = new MarkovMachine(resp.data);
            console.log(machine.makeText());
        }
        catch(err){
            console.log(`Error fetching ${path}: ${err}`)
        }
    
    }
}

outputText();
