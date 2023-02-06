// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { getEbsPrice } from './price';

const HOURS_PER_MONTH = 730;

export function getEstimate(workerNodes, infraNodesCount, ec2Prices, ebsPrices) {
  let ec2OnDemandMonthlyCost = 0;
  let ec21yearMonthlyCost = 0;
  let ec23yearMonthlyCost = 0;
  let rhOnDemandMonthlyCost = 0;
  let rh1yearMonthlyCost = 0;
  let rh3yearMonthlyCost = 0;

  const rosaWorkerNodesArray = Object.values(workerNodes);
  const workerNodeCount = workerNodes.length;

  for (const node of rosaWorkerNodesArray) {
    ec2OnDemandMonthlyCost += node.ec2PriceHour * HOURS_PER_MONTH;
    ec21yearMonthlyCost += node.ec2Price1y / 12;
    ec23yearMonthlyCost += node.ec2Price3y / 3 / 12;
    rhOnDemandMonthlyCost += node.rhOnDemandPriceHour * HOURS_PER_MONTH;
    rh1yearMonthlyCost += node.rh1yearPriceHour * HOURS_PER_MONTH;
    rh3yearMonthlyCost += node.rh3yearPriceHour * HOURS_PER_MONTH;
  }
  let ec2TypeInfra = 'r5.xlarge';
  if (workerNodeCount > 25 && workerNodeCount <= 100) {
    ec2TypeInfra = 'r5.2xlarge';
  } else if (workerNodeCount > 100) {
    ec2TypeInfra = 'r5.4xlarge';
  }

  const ec2Infra = (ec2Prices || []).find(ec2 => ec2.type === ec2TypeInfra);

  if (!ec2Infra) {
    throw new Error(`Infra node price not found (EC2 type: ${ec2TypeInfra})`);
  }

  const unitCostInfraOnDemand = Number(ec2Infra.priceOnDemand);
  const unitCostInfra1year = Number(ec2Infra.price1yr);
  const unitCostInfra3year = Number(ec2Infra.price3yr);

  let ec2TypeControlPlane = 'm5.2xlarge';
  if (workerNodeCount > 25 && workerNodeCount <= 100) {
    ec2TypeControlPlane = 'm5.4xlarge';
  } else if (workerNodeCount > 100) {
    ec2TypeControlPlane = 'm5.8xlarge';
  }

  const ec2Cplane = (ec2Prices || []).find(ec2 => ec2.type === ec2TypeControlPlane);

  if (!ec2Cplane) {
    throw new Error(`Control plane node price not found (EC2 type: ${ec2TypeControlPlane})`);
  }
  const unitCostControlPlaneOnDemand = Number(ec2Cplane.priceOnDemand);
  const unitCostControlPlane1year = Number(ec2Cplane.price1yr);

  const unitCostControlPlane3year = Number(ec2Cplane.price3yr);

  const ebsMonthlyPriceOthers = getEbsPrice(300, ebsPrices);
  const ebsMonthlyPriceControlPlane = getEbsPrice(350, ebsPrices);

  const estimate = {
    workers: {
      description: `ROSA Data Plane Cost (EC2): ${workerNodeCount}x nodes`,
      onDemand: {
        monthly: ec2OnDemandMonthlyCost,
        annually: ec2OnDemandMonthlyCost * 12,
      },
      '1year': {
        monthly: ec21yearMonthlyCost,
        annually: ec21yearMonthlyCost * 12,
      },
      '3year': {
        monthly: ec23yearMonthlyCost,
        annually: ec23yearMonthlyCost * 12,
      },
    },
    infra: {
      description: `ROSA Infra Node Cost (EC2): ${infraNodesCount}x ${ec2TypeInfra} nodes`,
      onDemand: {
        monthly: unitCostInfraOnDemand * infraNodesCount * HOURS_PER_MONTH,
        annually: unitCostInfraOnDemand * infraNodesCount * HOURS_PER_MONTH * 12,
        calculations: {
          monthly: `= $${unitCostInfraOnDemand} EC2 price 1 infra. node * ${infraNodesCount} nodes * ${HOURS_PER_MONTH}h`,
          annually: `= $${unitCostInfraOnDemand} EC2 price 1 infra. node * ${infraNodesCount} nodes * ${HOURS_PER_MONTH}h * 12`,
        },
      },
      '1year': {
        monthly: (unitCostInfra1year * infraNodesCount) / 12,
        annually: unitCostInfra1year * infraNodesCount,
        calculations: {
          monthly: `= $${unitCostInfra1year} EC2 price 1 infra. node / 1 year (All upfront) ÷ 12 * ${infraNodesCount} nodes`,
          annually: `= $${unitCostInfra1year} EC2 price 1 infra. node / 1 year (All upfront) * ${infraNodesCount} nodes`,
        },
      },
      '3year': {
        monthly: ((unitCostInfra3year / 3) * infraNodesCount) / 12,
        annually: (unitCostInfra3year / 3) * infraNodesCount,
        calculations: {
          monthly: `= $${unitCostInfra3year} EC2 price 1 infra. node / 3 year (All upfront) * ${infraNodesCount} nodes ÷ 3`,
          annually: `= $${unitCostInfra3year} EC2 price 1 infra. node / 3 year (All upfront) * ${infraNodesCount} nodes ÷ 3`,
        },
      },
    },
    controlPlane: {
      description: `ROSA Control Plane Cost (EC2): 3x ${ec2TypeControlPlane}`,
      onDemand: {
        monthly: unitCostControlPlaneOnDemand * 3 * HOURS_PER_MONTH,
        annually: unitCostControlPlaneOnDemand * 3 * HOURS_PER_MONTH * 12,
        calculations: {
          monthly: `$${unitCostControlPlaneOnDemand} EC2 price control plane node * 3 nodes * ${HOURS_PER_MONTH}h`,
          annually: `$${unitCostControlPlaneOnDemand} EC2 price control plane node * 3 nodes * ${HOURS_PER_MONTH}h * 12`,
        },
      },
      '1year': {
        monthly: (unitCostControlPlane1year * 3) / 12,
        annually: unitCostControlPlane1year * 3,
        calculations: {
          monthly: `$${unitCostControlPlane1year} EC2 price control plane node 1 year (All upfront) ÷ 12 * 3 nodes`,
          annually: `$${unitCostControlPlane1year} EC2 price control plane node 1 year (All upfront) * 3 nodes`,
        },
      },
      '3year': {
        monthly: ((unitCostControlPlane3year / 3) * 3) / 12,
        annually: (unitCostControlPlane3year / 3) * 3,
        calculations: {
          monthly: `$${unitCostControlPlane3year}$ EC2 price control plane node 3 year (All upfront) ÷ 12 ÷ 3 * 3 nodes`,
          annually: `$${unitCostControlPlane3year}$ EC2 price control plane node 3 year (All upfront) ÷ 3 * 3 nodes`,
        },
      },
    },
    redHatClusterFees: {
      description: `ROSA Control plane Red Hat fee`,
      monthly: 0.03 * HOURS_PER_MONTH,
      annually: 0.03 * HOURS_PER_MONTH * 12,
      calculations: {
        monthly: `$0.03 * ${HOURS_PER_MONTH}h`,
        annually: `$0.03 * ${HOURS_PER_MONTH}h * 12`,
      },
    },
    redHatDataplaneFees: {
      description: `ROSA Data plane Red Hat fee`,
      onDemand: {
        monthly: rhOnDemandMonthlyCost,
        annually: rhOnDemandMonthlyCost * 12,
      },
      '1year': {
        monthly: rh1yearMonthlyCost,
        annually: rh1yearMonthlyCost * 12,
      },
      '3year': {
        monthly: rh3yearMonthlyCost,
        annually: rh3yearMonthlyCost * 12,
      },
    },
    storageWorkers: {
      description: `ROSA Storage Cost (EBS): ${workerNodeCount}x worker nodes 300GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)`,
      monthly: ebsMonthlyPriceOthers * workerNodeCount,
      annually: ebsMonthlyPriceOthers * workerNodeCount * 12,
    },
    storageInfra: {
      description: `ROSA Storage Cost (EBS): ${infraNodesCount}x infra nodes 300GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)`,
      monthly: ebsMonthlyPriceOthers * infraNodesCount,
      annually: ebsMonthlyPriceOthers * infraNodesCount * 12,
    },
    storageControlPlane: {
      description: `ROSA Storage Cost (EBS): 3x control plane nodes 350GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)`,
      monthly: ebsMonthlyPriceControlPlane * 3,
      annually: ebsMonthlyPriceControlPlane * 3 * 12,
    },
  };

  const totalOnDemand =
    estimate.workers.onDemand.annually +
    estimate.infra.onDemand.annually +
    estimate.controlPlane.onDemand.annually +
    estimate.redHatClusterFees.annually +
    estimate.redHatDataplaneFees.onDemand.annually +
    estimate.storageWorkers.annually +
    estimate.storageInfra.annually +
    estimate.storageControlPlane.annually;

  const total1year =
    estimate.workers['1year'].annually +
    estimate.infra['1year'].annually +
    estimate.controlPlane['1year'].annually +
    estimate.redHatClusterFees.annually +
    estimate.redHatDataplaneFees['1year'].annually +
    estimate.storageWorkers.annually +
    estimate.storageInfra.annually +
    estimate.storageControlPlane.annually;

  const total3year =
    estimate.workers['3year'].annually +
    estimate.infra['3year'].annually +
    estimate.controlPlane['3year'].annually +
    estimate.redHatClusterFees.annually +
    estimate.redHatDataplaneFees['3year'].annually +
    estimate.storageWorkers.annually +
    estimate.storageInfra.annually +
    estimate.storageControlPlane.annually;

  const estimateTotal = {
    onDemand: {
      monthly: totalOnDemand / 12,
      annual: totalOnDemand,
    },
    oneYear: {
      monthly: total1year / 12,
      annually: total1year,
    },
    threeYear: {
      monthly: total3year / 12,
      annually: total3year,
    },
  };

  return {
    estimate,
    estimateTotal,
  };
}

export function getWorkerNodes(nodesConfig, ec2s) {
  if (nodesConfig.length < 2) {
    throw new Error('No EC2 instances added');
  }

  if (nodesConfig[0][0] !== 'ec2_type') {
    throw new Error('CSV header missing: ec2_type');
  }
  nodesConfig.shift(); // remove csv headers

  const workerFeesOnDemand = 0.171; // 1500/12/HOURS_PER_MONTH
  const workerFees1year = 1000 / 12 / HOURS_PER_MONTH;
  const workerFees3year = 667 / 12 / HOURS_PER_MONTH;

  const nodes = [];
  for (const row of nodesConfig) {
    const ec2Type = row[0];
    const ec2 = ec2s.find(ec2 => ec2.type === ec2Type);
    if (!ec2) {
      throw new Error(`EC2 type "${ec2Type}" not found in the Price API data`);
    }

    nodes.push({
      ec2Type,
      ec2PriceHour: Number(ec2.priceOnDemand),
      ec2Price1y: Number(ec2.price1yr),
      ec2Price3y: Number(ec2.price3yr),
      rhOnDemandPriceHour: Number(workerFeesOnDemand * (Number(ec2.vcpu) / 4)),
      rh1yearPriceHour: Number(workerFees1year * (Number(ec2.vcpu) / 4)),
      rh3yearPriceHour: Number(workerFees3year * (Number(ec2.vcpu) / 4)),
    });
  }

  return nodes;
}
