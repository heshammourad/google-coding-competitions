var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

let expect = 'begin';
let count = 0;
let numTestCases;

const outputLine = (...val) => {
    console.log(`Case #${++count}: ${val.join(' ')}`);
}

const getArrayOfNumbers = (line) => line.split(' ').map(val => parseInt(val, 10));

let N, D;

rl.on('line', line => {
    switch (expect) {
        case 'begin': {
            numTestCases = parseInt(line, 10);
            expect = 'constraints';
            break;
        }
        case 'constraints': {
            [N, D] = getArrayOfNumbers(line);
            expect = 'case';
            break;
        }
        case 'case': {
            const routes = getArrayOfNumbers(line);
            for (let i = routes.length - 1; i >= 0; i -= 1) {
                const route = routes[i];
                const multiple = Math.trunc(D / route);
                D -= D - route * multiple;
            }
            
            outputLine(D);
            
            expect = 'constraints';
            break;
        }
    }
}).on('close', () => {
    process.exit(0);
});
