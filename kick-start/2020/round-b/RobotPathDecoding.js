var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

let expect = 'begin';
let count = 0;
let numTestCases;

const outputLine = (...val) => {
    console.log(`Case #${++count}: ${val.join(' ')}`);
}

const getArrayOfNumbers = (line) => line.split(' ').map(val => parseInt(val, 10));

const numColumns = BigInt(Math.pow(10, 9));
let N, D;

rl.on('line', line => {
    switch (expect) {
        case 'begin': {
            numTestCases = parseInt(line, 10);
            expect = 'case';
            break;
        }
        case 'case': {
            const stack = [];
            const subprograms = [[BigInt(0), BigInt(0)]];
            Array.from(line).forEach((c) => {
                let curSubprogram = subprograms[0];
                switch (c) {
                    case 'N':
                        curSubprogram[1] -= BigInt(1);
                        break;
                    case 'S':
                        curSubprogram[1] += BigInt(1);
                        break;
                    case 'E':
                        curSubprogram[0] += BigInt(1);
                        break;
                    case 'W':
                        curSubprogram[0] -= BigInt(1);
                        break;
                    case '(':
                        subprograms.unshift([BigInt(0), BigInt(0)]);
                        break;
                    case ')':
                        const X = BigInt(stack.shift());
                        const [x, y] = subprograms.shift().map(i => i * X);
                        curSubprogram = subprograms[0];
                        curSubprogram[0] += x;
                        curSubprogram[1] += y;
                        break;
                    default: // 2-9
                        stack.unshift(parseInt(c, 10));
                        break;
                }
            });
            
            const [x, y] = subprograms[0];
            
            let w = BigInt(1) + (x % numColumns);
            if (w <= BigInt(0)) {
                w += numColumns;
            }
            
            let h = BigInt(1) + (y % numColumns);
            if (h <= BigInt(0)) {
                h += numColumns;
            }
            
            outputLine(w, h);
            break;
        }
    }
}).on('close', () => {
    process.exit(0);
});
