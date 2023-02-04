export default function GetCostEstimate(instanceCost, instanceCount) {
    let cost = 0
    const hoursInMonth = 730

    // worker nodes
    // Amazon EC2: 3 m5.xlarge nodes x $0.192 per node per hour x 730 hours	$420
    // Amazon EBS: 3 300GB General Purpose SSDs x ($0.10 per GB per month + 2 daily snapshots)
    const workerEC2Cost = instanceCost * parseInt(instanceCount) * 730
    const workerEBSCost = 148
    cost = cost + workerEC2Cost + workerEBSCost

    // service fees
    const serviceFee = instanceCount * 0.171 * hoursInMonth
    const clusterFee = 0.03 * hoursInMonth
    cost = cost + serviceFee + clusterFee

    // infra nodes
    // Amazon EC2: 3 r5.xlarge nodes x $0.252 per node per hour x 730 hours	$552
    // Amazon EBS: 3 300GB General Purpose SSDs x ($0.10 per GB per month + 2 daily snapshots)	$148
    const infraEC2Cost = 3 * 0.252 * hoursInMonth
    const infraEBSCost = 148
    // const infraEBSStorageCost = 3 * 300 * 0.125
    // const infraEBSIOPSCost = 3 * 1000 * 0.065

    cost = cost + infraEC2Cost + infraEBSCost

    // control plan nodes
    // Amazon EC2: 3 m5.2xlarge nodes x $0.384 per node per hour x 730 hours	$841
    // Amazon EBS: 3 350GB Provisioned IOPS 1000 x($0.125 per GB per month + 2 daily snapshots)	$392
    const controlPlaneEC2Cost = 3 * 0.384 * 730
    const controlPlaneStorage = 392
    cost = cost + controlPlaneEC2Cost + controlPlaneStorage


    const result = {
        instanceCost,
        instanceCount,
        workerEC2Cost,
        workerEBSCost,
        infraEC2Cost,
        infraEBSCost,
        controlPlaneEC2Cost,
        controlPlaneStorage,
        serviceFee,
        clusterFee,
        totalMonthly: cost.toFixed(2),
        totalAnnual: (parseFloat(cost.toFixed(2)) * 12).toFixed(2)
    }

    return result
}
