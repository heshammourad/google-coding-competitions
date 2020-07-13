var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

let expect = 'begin';
let count = 0;
let numTestCases;

const outputLine = (...val) => {
    console.log(`Case #${++count}: ${val.join(' ')}`);
};

const getArrayOfNumbers = (line) => line.split(' ').map(val => parseInt(val, 10));

rl.on('line', line => {
    switch (expect) {
        case 'begin': {
            numTestCases = parseInt(line, 10);
            expect = 'days';
            break;
        }
        case 'days': {
            expect = 'visitors';
            break;
        }
        case 'visitors': {
            expect = 'days';
            
            let max = -1;
            
            const visitors = [...getArrayOfNumbers(line), -1];
            const recordBreakingDays = visitors.reduce((acc, cur, idx) => {
                if (cur > max) {
                    max = cur;
                    if (cur > visitors[idx + 1]) {
                        return acc + 1;
                    }
                }
                return acc;
            }, 0);
            
            outputLine(recordBreakingDays);
            break;
        }
    }
}).on('close', () => {
    process.exit(0);
});
