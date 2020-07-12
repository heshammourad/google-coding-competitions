var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

let expect = 'begin';
let count = 0;
let numTestCases;

const outputLine = (...val) => {
    console.log(`Case #${++count}: ${val.join(' ')}`);
}

rl.on('line', line => {
    switch (expect) {
        case 'begin': {
            numTestCases = parseInt(line, 10);
            expect = 'checkpoints';
            break;
        }
        case 'checkpoints': {
            expect = 'case';
            break;
        }
        case 'case': {
            const heights = line.split(' ').map(val => parseInt(val, 10));
            const peaks = heights.reduce((acc, cur, idx) => {
                if (!idx || idx === heights.length - 1) {
                    return acc;
                }
                if (cur > heights[idx - 1] && cur > heights[idx + 1]) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            
            outputLine(peaks);
            
            expect = 'checkpoints';
            break;
        }
    }
}).on('close', () => {
    process.exit(0);
});
