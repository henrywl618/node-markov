const fs = require('fs');
/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chains = {};
    this.words.forEach( (word,idx) => {
      const nextWord = this.words[idx+1]
      if(this.chains[word]){
        this.chains[word] = [...this.chains[word],nextWord]
      }
      else{
        this.chains[word] = [nextWord]
      }
    })
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const randomIndex = Math.floor(Math.random() * Object.entries(this.chains).length);
    const startingWord = Object.keys(this.chains)[randomIndex];
    const outputArr = [];

    const addRandomWord = (key)=>{
      const randomIndex = Math.floor(Math.random() * this.chains[key].length);
      const word = this.chains[key][randomIndex];

      if (word === undefined || outputArr.length >= numWords){
        return
      }
      else{
        outputArr.push(word);
        addRandomWord(word);
      }
    }

    addRandomWord(startingWord);
    return outputArr.join(" ");
  }
}


module.exports = {
  MarkovMachine: MarkovMachine,
};