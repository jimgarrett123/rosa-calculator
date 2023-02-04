# ROSA sizing

## Context

Your customer is evaluating Red Hat OpenShift Service on AWS (ROSA) as:

- new platform
- future platform of choice to migrate from OSD, or, on-premises OpenShift workloads.

The current underlying infrastructure relies on virtual machines using RHEL OS, which Your customer pays Red Hat licences for.

As part of assessing costs, Your customer has requested information on the transition costs.

## Customer data

1. Your customer has provided a list of all virtual machines used to run their workloads. These machines are organised into multiple OpenShift clusters per environment (eg, Production, Staging, Development, Test and NPE).

2. The AWS team has also requested:

- when the current OpenShift subscriptions expire
- the current number of RHEL licenses purchased with their expiration dates.

This data is a key cost factor to consider because ROSA does not allow a BYOL (Bring Your Own License) model.

## Proposed cost estimate approach

This document provides a cost estimate calculation method based on Your customer's VMs.

1. **Right-sizing**

**Sizing approach**

The proposed approach in this document consists in importing the VMs* into AWS Migration Hub - for EC2 right-sizing recommendation purposes.

Given the important variance of compute utilization observed across Your customer's VMs, using general instance sizes for all ROSA worker nodes does not seem relevant and would likely increase costs if high spec EC2 instance types were selected as workers nodes used during current cluster creation (to satisfy maximum compute utilisation requirements).

Instead, AWS Migration Hub can recommend fined-grained sizing for each VM.

**Does ROSA support worker nodes using different EC2 instance types?**

By default, a ROSA cluster is created with one machine pool.

You can add additional machine pools to an existing cluster, modify the default machine pool, and delete machine pools.

Multiple machine pools can exist on a single cluster, and they can each have different types or different size nodes.

Machine pools are supported in multiple availability zone (Multi-AZ) clusters. In this scenario, one machine pool has 3 zones and the underlying nodes are spread across the 3 zones.

Node autoscaling can also be enabled on a per machine pool basis.

See ROSA documentation:

- machine pool: <https://docs.openshift.com/rosa/rosa_cluster_admin/rosa_nodes/rosa-nodes-machinepools-about.html>
- node autoscaling: <https://docs.openshift.com/rosa/rosa_cluster_admin/rosa_nodes/rosa-nodes-about-autoscaling-nodes.html>

**Sizing preference**

For each Your customer VM, AWS Migration Hub recommends an EC2 instance type. To determine the best instance match for each server, AWS Migration Hub inspects compute utilization through 4 methods that are based on:

- maximum utilization
- current server specification
- average utilization
- percentile of utilization

*: No particular indication has been formulated by the customer regarding the data extracted, so it is assumed that the data provided is representative of Your customer usual compute usage.

The cost estimates provided below use the **current server specification** and **average utilization** methods.

## Cost estimate

### Recommended sizes

The recommended sizes are visible in the migration-hub-recommendations.csv.

AWS Migration hub recommended the following instance types:

- c5a.4xlarge
- m5a.2xlarge
- m5a.4xlarge
- m5a.xlarge
- r5a.2xlarge
- r5a.4xlarge
- r5a.xlarge
- t3a.2xlarge
- t3a.xlarge

Among the recommended list, the following instance types are **not** supported by ROSA (see rosa-supported-instance-types.txt):

- m5a.xlarge (4 vCPUs, 16 GiB Memory)
- m5a.2xlarge (8 vCPUs, 32 GiB Memory)
- m5a.4xlarge (16 vCPUs, 64 GiB Memory)

So they will be replaced with respectively:

- m5.xlarge (4 vCPUs, 16 GiB Memory)
- m5.2xlarge (8 vCPUs, 32 GiB Memory)
- m5.4xlarge (16 vCPUs, 64 GiB Memory)

See details:

- EC2 instance types: <https://aws.amazon.com/ec2/instance-types/>
- Amazon EC2 M5 Instances: <https://aws.amazon.com/ec2/instance-types/m5/>

### Infra and control plane node sizing during installation

Based on the number of worker thresholds documented here <https://docs.openshift.com/rosa/rosa_planning/rosa-limits-scalability.html#node-sizing-during-installation_rosa-limits-scalability>, the control plane and infra instance types will be:

| Environment | Number of workers | Number of control plane node required | Control plane EC2 Instance type | Number of infra node required | Infrastructure node EC2 Instance type |
| ----------- | ----------------- | ------------------------------------- | ------------------------------- | ----------------------------- | ------------------------------------- |
| Production  | 19                | 3                                     | m5.2xlarge                      | 3                             | r5.xlarge                             |
| Staging     | 19                | 3                                     | m5.2xlarge                      | 3                             | r5.xlarge                             |
| Development | 22                | 3                                     | m5.2xlarge                      | 3                             | r5.xlarge                             |
| Test        | 9                 | 3                                     | m5.2xlarge                      | 3                             | r5.xlarge                             |
| NPE*        | 2                 | 3                                     | m5.2xlarge                      | 3                             | r5.xlarge                             |

NPE*: to be confirmed as data for this environment seems incomplete.

### Cost estimates

## Notes

1. Assuming Your customer already consumes AWS services, they will need to verify their AWS account quotas to satisfy [ROSA required quotas](Required AWS service quotas) and the minimum ROSA

## Usage

Get On-demand price for an instance: `python3 prices-ec2.py -r "Asia Pacific (Sydney)" -e m5.xlarge`.

Calculate cost:

```bash
npm run cost migration-hub/average-utilisation/workers > results/average-utilisation.csv
npm run cost migration-hub/current-server-specification/workers > results/current-server-specification.csv
```
