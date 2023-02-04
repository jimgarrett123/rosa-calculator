import { getEbsPrice } from "./price"

export type Estimate = {
    estimate: {
        controlPlane: {
            description: any;
            onDemand: {
                monthly: any;
                annually: any;
            };
        };
        infra: {
            description: any;
            onDemand: {
                monthly: any;
                annually: any;
            };
        };
        workers: {
            description: any;
            onDemand: {
                monthly: any;
                annually: any;
            };
        };
        storageWorkers: {
            description: any;
            monthly: any;
            annually: any;
        };
        storageInfra: {
            description: any;
            monthly: any;
            annually: any;
        };
        storageControlPlane: {
            description: any;
            monthly: any;
            annually: any;
        };
        redHatClusterFees: {
            description: any;
            monthly: any;
            annually: any;
        };
        redHatDataplaneFees: {
            description: any;
            monthly: any;
            annually: any;
        };
    }
    estimateTotal: {
        onDemand: {
            monthly: any,
            annual: any
        },
        oneYear: {
            monthly: any,
            annually: any
        },
        threeYear:
        {
            monthly: any,
            annually: any
        }
    }
};

const groupBy = (array, key) => {
    return array.reduce((acc, curr) => {
        (acc[curr[key]] = acc[curr[key]] || []).push(curr);
        return acc;
    }, {});
};


export function getEstimate(workerNodes: WorkerNode[], infraNodesCount: number, ec2Prices: any, ebsPrices: any): Estimate {
    let ec2MonthlyCost = 0
    let rhMonthlyCost = 0

    const rosaWorkerNodesArray = Object.values(workerNodes)
    const workerNodeCount = workerNodes.length

    for (const node of rosaWorkerNodesArray) {
        ec2MonthlyCost += node.ec2PriceHour as number * 730
        rhMonthlyCost += node.rhPriceHour as number * 730
    }

    let ec2TypeInfra = 'r5.xlarge'
    if (workerNodeCount > 25 && workerNodeCount <= 100) {
        ec2TypeInfra = 'r5.2xlarge'
    } else if (workerNodeCount > 100) {
        ec2TypeInfra = 'r5.4xlarge'
    }
    if (!ec2Prices[ec2TypeInfra]) {
        throw new Error(`Infra node price not found (EC2 type: ${ec2TypeInfra})`)
    }
    const unitCostInfra = ec2Prices[ec2TypeInfra].price

    let ec2TypeControlPlane = 'm5.2xlarge'
    if (workerNodeCount > 25 && workerNodeCount <= 100) {
        ec2TypeControlPlane = 'm5.4xlarge'
    } else if (workerNodeCount > 100) {
        ec2TypeControlPlane = 'm5.8xlarge'
    }
    if (!ec2Prices[ec2TypeControlPlane]) {
        throw new Error(`Control plane node price not found (EC2 type: ${ec2TypeControlPlane})`)
    }
    const unitCostControlPlane = ec2Prices[ec2TypeControlPlane].price

    const ebsMonthlyPriceOthers = getEbsPrice(300, ebsPrices)
    const ebsMonthlyPriceControlPlane = getEbsPrice(350, ebsPrices)
    const groupedData = groupBy(rosaWorkerNodesArray, 'ec2Type');
    let workerNodeLabel: string[] = []
    Object.entries(groupedData).forEach(([key, value]) => {
        workerNodeLabel.push(`${(value as string[]).length}x ${key}`);
    });

    const estimate = {
        workers: {
            description: `ROSA Data Plane Cost (EC2): ${workerNodeCount}x nodes (${workerNodeLabel.join(', ')})`,
            onDemand: {
                monthly: Math.round(ec2MonthlyCost),
                annually: Math.round(ec2MonthlyCost * 12),
            },
        },
        infra: {
            description: `ROSA Infra Node Cost (EC2): ${infraNodesCount}x ${ec2TypeInfra} nodes`,
            onDemand: {
                monthly: Math.round(unitCostInfra * infraNodesCount * 730),
                annually: Math.round(unitCostInfra * infraNodesCount * 730 * 12),
                calculations: {
                    monthly: `= ${unitCostInfra}$ EC2 price 1 infra. node * ${infraNodesCount} nodes * 730`,
                    annually: `= ${unitCostInfra}$ EC2 price 1 infra. node * ${infraNodesCount} nodes * 730 * 12`
                }
            },
        },
        controlPlane: {
            description: `ROSA Control Plane Cost (EC2): 3x ${ec2TypeControlPlane}`,
            onDemand: {
                monthly: Math.round(unitCostControlPlane * 3 * 730),
                annually: Math.round(unitCostControlPlane * 3 * 730 * 12),
                calculations: {
                    monthly: `${unitCostControlPlane}$ EC2 price control plane node * 3 nodes * 730`,
                    annually: `${unitCostControlPlane}$ EC2 price control plane node * 3 nodes * 730 * 12`
                }
            },
        },
        redHatClusterFees: {
            description: `ROSA Control plane Red Hat fee`,
            monthly: Math.round(0.03 * 730),
            annually: Math.round(0.03 * 730 * 12),
            calculations: {
                monthly: '0.03 * 730',
                annually: '0.03 * 730 * 12'
            }
        },
        redHatDataplaneFees: {
            description: `ROSA Data plane Red Hat fee`,
            monthly: Math.round(rhMonthlyCost),
            annually: Math.round(rhMonthlyCost * 12),
        },
        storageWorkers: {
            description: `ROSA Storage Cost (EBS): ${workerNodeCount}x worker nodes 300GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)`,
            monthly: Math.round(ebsMonthlyPriceOthers * workerNodeCount),
            annually: Math.round(ebsMonthlyPriceOthers * workerNodeCount) * 12,
        },
        storageInfra: {
            description: `ROSA Storage Cost (EBS): ${infraNodesCount}x infra nodes 300GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)`,
            monthly: Math.round(ebsMonthlyPriceOthers * infraNodesCount),
            annually: Math.round(ebsMonthlyPriceOthers * infraNodesCount) * 12
        },
        storageControlPlane: {
            description: `ROSA Storage Cost (EBS): 3x control plane nodes 350GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)`,
            monthly: Math.round(ebsMonthlyPriceControlPlane * 3),
            annually: Math.round(ebsMonthlyPriceControlPlane * 3) * 12
        }
    }

    const monthlyTotal = estimate.workers.onDemand.monthly
        + estimate.infra.onDemand.monthly
        + estimate.controlPlane.onDemand.monthly
        + estimate.redHatClusterFees.monthly
        + estimate.redHatDataplaneFees.monthly
        + estimate.storageWorkers.monthly
        + estimate.storageInfra.monthly
        + estimate.storageControlPlane.monthly

    const estimateTotal = {
        onDemand: {
            monthly: monthlyTotal,
            annual: monthlyTotal * 12
        },
        oneYear: {
            monthly: Math.round(monthlyTotal * 0.66),
            annually: Math.round(monthlyTotal * 12 * 0.66),
        },
        threeYear:
        {
            monthly: Math.round(monthlyTotal * 0.45),
            annually: Math.round(monthlyTotal * 12 * 0.45),
        }
    }

    return {
        estimate,
        estimateTotal
    }
}

type WorkerNode = {
    ec2Type: string,
    ec2PriceHour: number,
    rhPriceHour: number,
}

export function getWorkerNodes(nodesConfig: any, prices: any): WorkerNode[] {
    if (nodesConfig.length < 2) {
        throw new Error('No EC2  instances found in CSV data')
    }

    if (nodesConfig[0][0] !== 'ec2_type') {
        console.error(nodesConfig)
        throw new Error('CSV header missing: ec2_type')
    }
    nodesConfig.shift(); // remove csv headers

    let nodes: any[] = []
    for (const row of nodesConfig) {
        const ec2PriceHour = prices[row[0]];
        nodes.push({
            ec2Type: row[0],
            ec2PriceHour: ec2PriceHour.price,
            rhPriceHour: Number(0.171 * (ec2PriceHour.vcpu / 4)),
        });
    }

    return nodes
}
