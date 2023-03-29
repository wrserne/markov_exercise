/** build markov machine; read in text.*/

constructor(text)
{
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
}

/** set markov chains:
 *
 *  for text of "the cat in the hat", chains will be
 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

makeChains() {
    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
        const word = this.words[i];
        const nextWord = this.words[i + 1] || null;

        if (!(word in chains)) {
            chains[word] = [];
        }

        chains[word].push(nextWord);
    }

    this.chains = chains;
}

/** return random text from chains */

makeText(numWords = 100) {
    const words = [];

    let currentWord = this.words[Math.floor(Math.random() * this.words.length)];

    while (words.length < numWords && currentWord !== null) {
        words.push(currentWord);
        currentWord = this.chains[currentWord][Math.floor(Math.random() * this.chains[currentWord].length)];
    }

    return words.join(" ");
}


module.exports = {
    MarkovMachine,
};