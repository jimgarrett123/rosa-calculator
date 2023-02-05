import fs from "fs";
import path from 'path';
import Papa from 'papaparse';
import { getEC2Prices, EC2InstancePrices, getEbsPrice } from "./lib/price";
import { getEstimate, getWorkerNodes } from "./lib/cost";
import { getCsvEstimate } from './lib/csvEstimate';

const myArgs = process.argv.slice(2);

console.log(myArgs)

const directoryPath = myArgs[0]
if (!fs.readdirSync(directoryPath)) {
    throw new Error('Directory path missing')
}

const ec2PricesPath = myArgs[1]
if (!fs.existsSync(ec2PricesPath)) {
    throw new Error('EC2 Price file missing')
}
const ec2Prices = JSON.parse(fs.readFileSync(ec2PricesPath, { encoding: 'utf8', flag: 'r' }))

const ebsPricesPath = myArgs[2]
if (!fs.existsSync(ebsPricesPath)) {
    throw new Error('EBS Price file missing')
}
const ebsPrices = JSON.parse(fs.readFileSync(ebsPricesPath, { encoding: 'utf8', flag: 'r' }))

const outPath = `${directoryPath}/cost-estimated-generated.csv`
fs.appendFileSync(outPath, path.basename(ec2PricesPath) + '\n')
fs.appendFileSync(outPath, path.basename(ebsPricesPath) + '\n')

const suffix = `-generated.csv`

fs.readdirSync(directoryPath).map(file => `${directoryPath}/${file}`).forEach(filePath => {
    if (filePath.indexOf(suffix) <= 0) {
        console.log(`Parsing CSV ${filePath}`)

        const dataStream = fs.createReadStream(filePath);
        const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT);
        dataStream.pipe(parseStream);

        let data: any[] = [];
        parseStream
            .on("data", chunk => {
                data.push(chunk);
            })
            .on("finish", () => {
                const workers = getWorkerNodes(data, ec2Prices);
                const estimate1 = getEstimate(workers, 3, ec2Prices, ebsPrices)
                const label1 = `${path.basename(filePath).replace('.csv', '')} - Multi AZ`
                getCsvEstimate(outPath, label1, estimate1)

                const estimate2 = getEstimate(workers, 2, ec2Prices, ebsPrices)
                const label2 = `${path.basename(filePath).replace('.csv', '')} - Single AZ`
                getCsvEstimate(outPath, label2, estimate2)
                console.log(`ROSA Cost estimate output file: ${outPath}`)
            });
    }
})
