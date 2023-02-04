import fs from "fs";
import { Estimate } from "./cost";

export function getCsvEstimate(multiAzPath: fs.PathOrFileDescriptor, label: string, estimate: Estimate) {

    const output: string[] = [];

    output.push(`${label}, , , , , ,\n`);
    output.push(',"Option1: On Demand",,"Option 2: ROSA 1 yr", "" , "Option 3: 3 Year"\n');
    output.push(`, Monthly, Annually, Monthly, Annually, Monthly, Annually\n`);
    output.push(`${estimate.estimate.controlPlane.description}, ${estimate.estimate.controlPlane.onDemand.monthly}, ${estimate.estimate.controlPlane.onDemand.annually},,,,\n`);
    output.push(`${estimate.estimate.infra.description}, ${estimate.estimate.infra.onDemand.monthly}, ${estimate.estimate.infra.onDemand.annually},,,,\n`);
    output.push(`${estimate.estimate.workers.description}, ${estimate.estimate.workers.onDemand.monthly}, ${estimate.estimate.workers.onDemand.annually},,,,\n`);
    output.push(`${estimate.estimate.storageWorkers.description}, ${estimate.estimate.storageWorkers.monthly}, ${estimate.estimate.storageWorkers.annually},,,,\n`);
    output.push(`${estimate.estimate.storageInfra.description}, ${estimate.estimate.storageInfra.monthly}, ${estimate.estimate.storageInfra.annually},,,,\n`);
    output.push(`${estimate.estimate.storageControlPlane.description}, ${estimate.estimate.storageControlPlane.monthly}, ${estimate.estimate.storageControlPlane.annually},,,,\n`);
    output.push(`${estimate.estimate.redHatClusterFees.description}, ${estimate.estimate.redHatClusterFees.monthly}, ${estimate.estimate.redHatClusterFees.annually},,,,\n`);
    output.push(`${estimate.estimate.redHatDataplaneFees.description}, ${estimate.estimate.redHatDataplaneFees.monthly}, ${estimate.estimate.redHatDataplaneFees.annually},,,,\n`);
    output.push(`, ${estimate.estimateTotal.onDemand.monthly}, ${estimate.estimateTotal.onDemand.annual}, ${estimate.estimateTotal.oneYear.monthly}, ${estimate.estimateTotal.oneYear.annually}, ${estimate.estimateTotal.threeYear.monthly}, ${estimate.estimateTotal.threeYear.annually}\n`);

    fs.appendFileSync(multiAzPath, output.join());
}
