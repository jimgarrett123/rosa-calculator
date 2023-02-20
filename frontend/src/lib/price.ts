// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export type EC2InstancePrices = Record<string, { price: number; vcpu: number }>;

export function getEC2Prices(rawPrices: any) {
  const prices: EC2InstancePrices = {};

  for (const price of rawPrices) {
    const key = Object.keys(price);
    prices[key[0]] = {
      price: Number(price[key[0]]),
      vcpu: Number(price.vcpu),
    };
  }
  return prices;
}

export function getEbsPrice(storageAmount: number, prices: any) {
  // 3,000 iops / 300 GB = 10.00 IOPS to GB ratio (gp3)
  // 125 MBps / 3,000 iops = 0.04 IOPS to Throughput ratio
  // 1 volumes x 730 instance hours = 730.00 total instance hours
  // 730.00 instance hours / 730 hours in a month = 1.00 instance months
  // 300 GB x 1.00 instance months x 0.08 USD = 24.00 USD (EBS Storage Cost)
  // EBS Storage Cost: 24.00 USD
  const gp3Cost = Number(prices['Storage General Purpose gp3 GB Mo'].price); //0.08
  const storageCost = gp3Cost * storageAmount;

  const gp3SnapshotCost = Number(prices['Storage Snapshot Amazon S3 GB Mo'].price);
  // Initial snapshot cost: 300 GB x 0.0500000000 = 15 USD
  const storageSnapshotCost = gp3SnapshotCost * storageAmount;
  // Monthly cost of each snapshot: 3 GB x 0.0500000000 USD = 0.15 USD
  const monthlyCostEachSnapshot = 3 * gp3SnapshotCost;
  // Discount for partial storage month: 0.15 USD x 50% = 0.075 USD
  const discountPartialStorage = monthlyCostEachSnapshot * 0.5;
  // 2x daily
  const countSnapshot = 30 * 2;
  // Incremental snapshot cost: 0.075 USD x 59.83 = 4.48725 USD
  const incrementalSnapshotCost = countSnapshot * discountPartialStorage;
  // Total snapshot cost: 15 USD + 4.48725 USD = 19.48725 USD
  const totalSnapshot = storageSnapshotCost + incrementalSnapshotCost;

  // 24.00 USD + 19.49 USD = 43.49 USD (Total EBS cost)
  return storageCost + totalSnapshot;
}
