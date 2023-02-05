import { describe, expect, test } from '@jest/globals';
import { getEstimate, getWorkerNodes } from './cost';

const mockEbsPrices = {
  "Storage General Purpose GB Mo": {
    "rateCode": "HY3BZPP2B6K8MSJF.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.1000000000"
  },
  "Storage Provisioned IOPS GB Mo": {
    "rateCode": "JR4AM7VS63CTEPMN.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.1250000000"
  },
  "Storage Cold HDD GB Mo": {
    "rateCode": "6U5VMCFHHMTH3QW6.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0150000000"
  },
  "Storage Throughput Optimized HDD GB Mo": {
    "rateCode": "YQT3C842QHBG6XCU.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0450000000"
  },
  "Storage Magnetic GB Mo": {
    "rateCode": "269VXUCZZ7E6JNXT.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0500000000"
  },
  "Storage General Purpose gp2 GB Mo": {
    "rateCode": "HY3BZPP2B6K8MSJF.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.1000000000"
  },
  "Storage General Purpose gp3 GB Mo": {
    "rateCode": "JG3KUJMBRGHV3N8G.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0800000000"
  },
  "Storage Provisioned IOPS io1 GB Mo": {
    "rateCode": "JR4AM7VS63CTEPMN.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.1250000000"
  },
  "Storage Provisioned IOPS io2 GB month": {
    "rateCode": "6V576P37PS7K7KYU.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.1250000000"
  },
  "Storage Provisioned IOPS io2 GB Mo": {
    "rateCode": "6V576P37PS7K7KYU.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.1250000000"
  },
  "Storage Cold HDD sc1 GB Mo": {
    "rateCode": "6U5VMCFHHMTH3QW6.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0150000000"
  },
  "Storage Throughput Optimized HDD st1 GB Mo": {
    "rateCode": "YQT3C842QHBG6XCU.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0450000000"
  },
  "Storage Magnetic standard GB Mo": {
    "rateCode": "269VXUCZZ7E6JNXT.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0500000000"
  },
  "Storage Snapshot Amazon S3 GB Mo": {
    "rateCode": "7U7TWP44UP36AT3R.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0500000000"
  },
  "Storage Snapshot Amazon S3 SnapshotArchiveEarlyDelete GB Mo": {
    "rateCode": "GHTDRQFFXQZVJNXF.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0125000000"
  },
  "Storage Snapshot Amazon S3 SnapshotArchiveRetrieval GB": {
    "rateCode": "DDSCQ4YGF66NWWRJ.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0300000000"
  },
  "Storage Snapshot Amazon S3 SnapshotArchiveStorage GB Mo": {
    "rateCode": "TQQM6CHBJQ7MKT24.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0125000000"
  },
  "Storage Snapshot Amazon S3 Outpost GB Mo": {
    "rateCode": "PXAF4HC3TVCEH5XQ.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0270000000"
  },
  "Provisioned Throughput gp3 per GiBps mo": {
    "rateCode": "SQUFRQX4K92S4SBB.JRTCKXETXF.6YS6EN2CT7",
    "price": "40.9600000000"
  },
  "Provisioned EBS IOPS Volumes per IOPS Mo": {
    "rateCode": "D8RDVC722HKNR55G.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0650000000"
  },
  "Provisioned EBS I O Requests Volumes per IOs": {
    "rateCode": "VV3ASRE8RPAY7C9U.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0000000500"
  },
  "Provisioned EBS IOPS gp3 Volumes per IOPS Mo": {
    "rateCode": "7Q58NR58VQEASA4W.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0050000000"
  },
  "Provisioned EBS IOPS io1 Volumes per IOPS Mo": {
    "rateCode": "D8RDVC722HKNR55G.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0650000000"
  },
  "Provisioned EBS IOPS io2 Volumes per IOPS Mo": {
    "rateCode": "X9AGQNCQXFA9Q8XZ.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0650000000"
  },
  "Provisioned EBS IOPS Tier 2 io2 Volumes per IOPS Mo": {
    "rateCode": "KDKG2R3W4NMV7CHP.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0455000000"
  },
  "Provisioned EBS IOPS Tier 3 io2 Volumes per IOPS Mo": {
    "rateCode": "AX8G343U7JZBRKJB.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0318500000"
  },
  "Provisioned EBS I O Requests standard Volumes per IOs": {
    "rateCode": "VV3ASRE8RPAY7C9U.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0000000500"
  },
  "Get Requests for EBS direct APIs per SnapshotAPIUnits": {
    "rateCode": "QRY3U66NSBVRCCHZ.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0000030000"
  },
  "List Requests for EBS direct APIs per Requests": {
    "rateCode": "9PNNGFWQP7349GGM.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0000006000"
  },
  "Put Requests for EBS direct APIs per SnapshotAPIUnits": {
    "rateCode": "TUB3X35AQ4QARUZC.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.0000060000"
  },
  "Fast Snapshot Restore per hours": {
    "rateCode": "JMGBAZ4CB88RKXT5.JRTCKXETXF.6YS6EN2CT7",
    "price": "0.7500000000"
  }
}

const getMockNodes = (string, count) => {
  const nodes = Array.from({ length: count }, () => [string]);
  return [...[['ec2_type']], ...nodes];
};


describe('get worker nodes', () => {
  test('throws if price not found', () => {
    expect(() => getWorkerNodes([
['ec2_type'],
['r5.4xlarge']],
[{
  "type": "g4dn.16xlarge",
  "priceOnDemand": "4.3520000000",
  "vcpu": "64",
  "memory": "256 GiB",
  "price3yr": "43003",
  "price1yr": "22417"
}])).


toThrowErrorMatchingInlineSnapshot(`"EC2 type "r5.4xlarge" not found in prices"`)
  });

  test('return worker nodes and their prices', () => {
    expect(getWorkerNodes([
['ec2_type'],
['r5.4xlarge']],

[{
  "type": "r5.4xlarge",
  "priceOnDemand": "4.832",
  "vcpu": "64",
  "memory": "256 GiB",
  "price3yr": "43003",
  "price1yr": "22417"
}])).

toMatchInlineSnapshot(`
[
  {
    "ec2Price1y": 22417,
    "ec2Price3y": 43003,
    "ec2PriceHour": 4.832,
    "ec2Type": "r5.4xlarge",
    "rh1yearPriceHour": 1.82648401826484,
    "rh3yearPriceHour": 1.2182648401826484,
    "rhOnDemandPriceHour": 2.736,
  },
]
`)
  });

});

describe('estimate', () => {
  test('should fail due to infra node price not found', () => {

    const ec2Prices = [{
        "type": "m5.xlarge",
        "priceOnDemand": "0.192",
        "vcpu": "4",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
    }]
    const ebsPrices = {}

    const workerNodes = getWorkerNodes(getMockNodes("m5.xlarge", 3), ec2Prices)

    expect(() =>
      getEstimate(
        workerNodes,
        3,
        ec2Prices, ebsPrices)).toThrowErrorMatchingInlineSnapshot(`"Infra node price not found (EC2 type: r5.xlarge)"`)
  })

  test('should fail due to control plane node price not found', () => {

    const ec2Prices = [
      {
        "type": "m5.xlarge",
        "priceOnDemand": "0.192",
        "vcpu": "4",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      },
      {
        "type": "r5.xlarge",
        "priceOnDemand":  "0.252",
        "vcpu": "4",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
    }]

    const ebsPrices = {}

    const workerNodes = getWorkerNodes(getMockNodes("m5.xlarge", 3), ec2Prices)

    expect(() =>
      getEstimate(
        workerNodes,
        3,
        ec2Prices, ebsPrices)).toThrowErrorMatchingInlineSnapshot(`"Control plane node price not found (EC2 type: m5.2xlarge)"`)
  })

  test('should be identical to on-demand example in ROSA pricing page https://aws.amazon.com/rosa/pricing/', () => {

    const ec2Prices = [
      {
        "type": "m5.xlarge",
        "priceOnDemand": "0.192",
        "vcpu": "4",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      },
      {
        "type": "r5.xlarge",
        "priceOnDemand": "0.252",
        "vcpu": "4",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      },
      {
        "type": "m5.2xlarge",
        "priceOnDemand": "0.384",
        "vcpu": "8",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      }
    ]  

    const workerNodes = getWorkerNodes(getMockNodes("m5.xlarge", 3), ec2Prices)

    expect(
getEstimate(
workerNodes,
3,
ec2Prices, mockEbsPrices)).toMatchInlineSnapshot(`
{
  "estimate": {
    "controlPlane": {
      "1year": {
        "annually": 67251,
        "calculations": {
          "annually": "$22417 EC2 price control plane node 1 year (All upfront) * 3 nodes",
          "monthly": "$22417 EC2 price control plane node 1 year (All upfront) ÷ 12 * 3 nodes",
        },
        "monthly": 5604.25,
      },
      "3year": {
        "annually": 43003,
        "calculations": {
          "annually": "$43003$ EC2 price control plane node 3 year (All upfront) ÷ 3 * 3 nodes",
          "monthly": "$43003$ EC2 price control plane node 3 year (All upfront) ÷ 12 ÷ 3 * 3 nodes",
        },
        "monthly": 3583.5833333333335,
      },
      "description": "ROSA Control Plane Cost (EC2): 3x m5.2xlarge",
      "onDemand": {
        "annually": 10091.520000000002,
        "calculations": {
          "annually": "$0.384 EC2 price control plane node * 3 nodes * 730h * 12",
          "monthly": "$0.384 EC2 price control plane node * 3 nodes * 730h",
        },
        "monthly": 840.9600000000002,
      },
    },
    "infra": {
      "1year": {
        "annually": 67251,
        "calculations": {
          "annually": "= $22417 EC2 price 1 infra. node / 1 year (All upfront) * 3 nodes",
          "monthly": "= $22417 EC2 price 1 infra. node / 1 year (All upfront) ÷ 12 * 3 nodes",
        },
        "monthly": 5604.25,
      },
      "3year": {
        "annually": 43003,
        "calculations": {
          "annually": "= $43003 EC2 price 1 infra. node / 3 year (All upfront) * 3 nodes ÷ 3",
          "monthly": "= $43003 EC2 price 1 infra. node / 3 year (All upfront) * 3 nodes ÷ 3",
        },
        "monthly": 3583.5833333333335,
      },
      "description": "ROSA Infra Node Cost (EC2): 3x r5.xlarge nodes",
      "onDemand": {
        "annually": 6622.5599999999995,
        "calculations": {
          "annually": "= $0.252 EC2 price 1 infra. node * 3 nodes * 730h * 12",
          "monthly": "= $0.252 EC2 price 1 infra. node * 3 nodes * 730h",
        },
        "monthly": 551.88,
      },
    },
    "redHatClusterFees": {
      "annually": 262.79999999999995,
      "calculations": {
        "annually": "$0.03 * 730h * 12",
        "monthly": "$0.03 * 730h",
      },
      "description": "ROSA Control plane Red Hat fee",
      "monthly": 21.9,
    },
    "redHatDataplaneFees": {
      "1year": {
        "annually": 3000,
        "monthly": 250,
      },
      "3year": {
        "annually": 2001,
        "monthly": 166.75,
      },
      "description": "ROSA Data plane Red Hat fee",
      "onDemand": {
        "annually": 4493.88,
        "monthly": 374.49,
      },
    },
    "storageControlPlane": {
      "annually": 1800,
      "description": "ROSA Storage Cost (EBS): 3x control plane nodes 350GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)",
      "monthly": 150,
    },
    "storageInfra": {
      "annually": 1566,
      "description": "ROSA Storage Cost (EBS): 3x infra nodes 300GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)",
      "monthly": 130.5,
    },
    "storageWorkers": {
      "annually": 1566,
      "description": "ROSA Storage Cost (EBS): 3x worker nodes 300GB General Purpose SSDs (gp3 - 3000 IOPS + 2 daily snapshots)",
      "monthly": 130.5,
    },
    "workers": {
      "1year": {
        "annually": 67251,
        "monthly": 5604.25,
      },
      "3year": {
        "annually": 43003,
        "monthly": 3583.5833333333335,
      },
      "description": "ROSA Data Plane Cost (EC2): 3x nodes",
      "onDemand": {
        "annually": 5045.76,
        "monthly": 420.48,
      },
    },
  },
  "estimateTotal": {
    "onDemand": {
      "annual": 31448.520000000004,
      "monthly": 2620.7100000000005,
    },
    "oneYear": {
      "annually": 209947.8,
      "monthly": 17495.649999999998,
    },
    "threeYear": {
      "annually": 136204.8,
      "monthly": 11350.4,
    },
  },
}
`)
  })

  test('should change the size of the control plane and infra if >25 and <= 100', () => {
    const ec2Prices = [
      {
        "type": "m5.xlarge",
        "priceOnDemand": "0.384",
        "vcpu": "8",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      },
      {
        "type": "r5.2xlarge",
        "priceOnDemand": "0.252",
        "vcpu": "4",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      },
      {
        "type": "m5.4xlarge",
        "priceOnDemand": "0.384",
        "vcpu": "8",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      }
    ]  

    const workerNodes = getWorkerNodes(getMockNodes("m5.xlarge", 26), ec2Prices)

    expect(
      getEstimate(
        workerNodes,
        3,
        ec2Prices, mockEbsPrices)).toMatchObject(
          {
            "estimate": {
              "controlPlane": {
                "description": "ROSA Control Plane Cost (EC2): 3x m5.4xlarge",
              },
              "infra": {
                "description": "ROSA Infra Node Cost (EC2): 3x r5.2xlarge nodes",
              },
            },
          }
        )
  })

  test('should change the size of the control plane and infra if >100', () => {

    const ec2Prices = [
      {
        "type": "m5.xlarge",
        "priceOnDemand": "0.384",
        "vcpu": "8",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      },
      {
        "type": "r5.4xlarge",
        "priceOnDemand": "0.252",
        "vcpu": "4",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      },
      {
        "type": "m5.8xlarge",
        "priceOnDemand": "0.384",
        "vcpu": "8",
        "memory": "256 GiB",
        "price3yr": "43003",
        "price1yr": "22417"
      }
    ]  

    const workerNodes = getWorkerNodes(getMockNodes("m5.xlarge", 101), ec2Prices)

    expect(
      getEstimate(
        workerNodes,
        3,
        ec2Prices, mockEbsPrices)).toMatchObject(
          {
            "estimate": {
              "controlPlane": {
                "description": "ROSA Control Plane Cost (EC2): 3x m5.8xlarge",
              },
              "infra": {
                "description": "ROSA Infra Node Cost (EC2): 3x r5.4xlarge nodes",
              },
            },
          }
        )
  })
})

describe('input data (worker nodes', () => {
  test('fails if no instances found in csv data ', () => {
    expect(() =>
getWorkerNodes([], [
{
  "type": "m5.4xlarge",
  "priceOnDemand": "0.384",
  "vcpu": "8",
  "memory": "256 GiB",
  "price3yr": "43003",
  "price1yr": "22417"
}])).
toThrowErrorMatchingInlineSnapshot(`"No EC2 instances found in CSV data"`)
  })

  test('fails if csv data does not contain ec2_type header in first line', () => {
    expect(() =>
      getWorkerNodes([['m5.large'], ['m5.large']], [
        {
          "type": "m5.4xlarge",
          "priceOnDemand": "0.384",
          "vcpu": "8",
          "memory": "256 GiB",
          "price3yr": "43003",
          "price1yr": "22417"
        }])).
      toThrowErrorMatchingInlineSnapshot(`"CSV header missing: ec2_type"`)
  })
})