const fs = require('fs').promises;
const path = require('path')

const REPORT_PATH = path.resolve(__dirname, 'expensereport.txt');

function algo(report = []) {
    let duoNumbers;
    let duoResult;
    let triNumbers;
    let triResult;

    for (const [topIndex, value1] of report.entries()) {
        for (const [midIndex, value2] of report.entries()) {
            if (duoResult === undefined && topIndex !== midIndex && value1 + value2 === 2020) {
                duoNumbers = [value1, value2];
                duoResult = value1 * value2;
            }

            for (const [botIndex, value3] of report.entries()) {
                if (topIndex === midIndex && midIndex === botIndex) {
                    continue;
                }

                if (value1 + value2 + value3 === 2020) {
                    triNumbers = [value1, value2, value3];
                    triResult = value1 * value2 * value3;

                    break;
                }
            }

            if (duoResult !== undefined && triResult !== undefined) {
                return {
                    duoNumbers,
                    duoResult,
                    triNumbers,
                    triResult
                };
            }
        }
    }
}

(async () => {
    const reportContents = await fs.readFile(REPORT_PATH);

    const reportNumbers = reportContents
        .toString()
        .split('\n')
        .map(Number);
        
    const { duoNumbers, triNumbers, duoResult, triResult } = algo(reportNumbers);
    
    console.log('DUO Result:');
    console.log(`    Numbers that equal 2020: ${JSON.stringify(duoNumbers)}`);
    console.log(`    Report answer: ${duoResult}`);
    console.log('');
    console.log('TRI Result:');
    console.log(`    Numbers that equal 2020: ${JSON.stringify(triNumbers)}`);
    console.log(`    Report answer: ${triResult}`);
})();
