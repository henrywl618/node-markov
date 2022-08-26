const {MarkovMachine} = require("./markov.js")

describe("Markov class", ()=>{
    let machine;

    beforeAll(()=>{
        machine = new MarkovMachine("the cat in the hat");
    })

    test("markov machine", ()=>{
        expect(machine).toBeInstanceOf(MarkovMachine);
        expect(machine).toMatchObject({
            words: expect.any(Array),
            chains: expect.any(Object),
        });
    })

    test("words", ()=>{
        const results = ["the", "cat", "in", "the", "hat"];
        expect(machine.words).toBeInstanceOf(Array);
        expect(machine.words).toEqual(results);
    })

    test("make chains", ()=>{
        const results = {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [undefined]}
        expect(machine.chains).toBeInstanceOf(Object)
        expect(machine.chains).toEqual(results)
    })

    test("make text", ()=>{
        const newText = machine.makeText()
        const newText2 = machine.makeText(25)

        expect(newText).toEqual(expect.any(String))
        expect(newText2).toEqual(expect.any(String))
        expect(newText.split(/[ \r\n]+/).length).toBeLessThanOrEqual(100)
        expect(newText.split(/[ \r\n]+/).length).toBeLessThanOrEqual(25)
    })
})