// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { describe, expect, test } from '@jest/globals';
import { getEbsPrice, getEC2Prices } from './price';

describe('get ec2 price', () => {
  test('returns price and vcpu', () => {
    expect(
      getEC2Prices([
        { 'g4dn.12xlarge': '4.3430000000', vcpu: '48', memory: '192 GiB' },
        { 'g4dn.16xlarge': '4.8320000000', vcpu: '64', memory: '256 GiB' },
        { 'g4dn.2xlarge': '0.8350000000', vcpu: '8', memory: '32 GiB' },
      ])
    ).toMatchInlineSnapshot(`
Object {
  "g4dn.12xlarge": Object {
    "price": 4.343,
    "vcpu": 48,
  },
  "g4dn.16xlarge": Object {
    "price": 4.832,
    "vcpu": 64,
  },
  "g4dn.2xlarge": Object {
    "price": 0.835,
    "vcpu": 8,
  },
}
`);
  });
});

describe('get ebs price', () => {
  test('returns price and vcpu', () => {
    expect(
      getEbsPrice(300, {
        'Storage General Purpose GB Mo': {
          rateCode: 'HY3BZPP2B6K8MSJF.JRTCKXETXF.6YS6EN2CT7',
          price: '0.1000000000',
        },
        'Storage Provisioned IOPS GB Mo': {
          rateCode: 'JR4AM7VS63CTEPMN.JRTCKXETXF.6YS6EN2CT7',
          price: '0.1250000000',
        },
        'Storage Cold HDD GB Mo': {
          rateCode: '6U5VMCFHHMTH3QW6.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0150000000',
        },
        'Storage Throughput Optimized HDD GB Mo': {
          rateCode: 'YQT3C842QHBG6XCU.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0450000000',
        },
        'Storage Magnetic GB Mo': {
          rateCode: '269VXUCZZ7E6JNXT.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0500000000',
        },
        'Storage General Purpose gp2 GB Mo': {
          rateCode: 'HY3BZPP2B6K8MSJF.JRTCKXETXF.6YS6EN2CT7',
          price: '0.1000000000',
        },
        'Storage General Purpose gp3 GB Mo': {
          rateCode: 'JG3KUJMBRGHV3N8G.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0800000000',
        },
        'Storage Provisioned IOPS io1 GB Mo': {
          rateCode: 'JR4AM7VS63CTEPMN.JRTCKXETXF.6YS6EN2CT7',
          price: '0.1250000000',
        },
        'Storage Provisioned IOPS io2 GB month': {
          rateCode: '6V576P37PS7K7KYU.JRTCKXETXF.6YS6EN2CT7',
          price: '0.1250000000',
        },
        'Storage Provisioned IOPS io2 GB Mo': {
          rateCode: '6V576P37PS7K7KYU.JRTCKXETXF.6YS6EN2CT7',
          price: '0.1250000000',
        },
        'Storage Cold HDD sc1 GB Mo': {
          rateCode: '6U5VMCFHHMTH3QW6.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0150000000',
        },
        'Storage Throughput Optimized HDD st1 GB Mo': {
          rateCode: 'YQT3C842QHBG6XCU.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0450000000',
        },
        'Storage Magnetic standard GB Mo': {
          rateCode: '269VXUCZZ7E6JNXT.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0500000000',
        },
        'Storage Snapshot Amazon S3 GB Mo': {
          rateCode: '7U7TWP44UP36AT3R.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0500000000',
        },
        'Storage Snapshot Amazon S3 SnapshotArchiveEarlyDelete GB Mo': {
          rateCode: 'GHTDRQFFXQZVJNXF.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0125000000',
        },
        'Storage Snapshot Amazon S3 SnapshotArchiveRetrieval GB': {
          rateCode: 'DDSCQ4YGF66NWWRJ.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0300000000',
        },
        'Storage Snapshot Amazon S3 SnapshotArchiveStorage GB Mo': {
          rateCode: 'TQQM6CHBJQ7MKT24.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0125000000',
        },
        'Storage Snapshot Amazon S3 Outpost GB Mo': {
          rateCode: 'PXAF4HC3TVCEH5XQ.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0270000000',
        },
        'Provisioned Throughput gp3 per GiBps mo': {
          rateCode: 'SQUFRQX4K92S4SBB.JRTCKXETXF.6YS6EN2CT7',
          price: '40.9600000000',
        },
        'Provisioned EBS IOPS Volumes per IOPS Mo': {
          rateCode: 'D8RDVC722HKNR55G.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0650000000',
        },
        'Provisioned EBS I O Requests Volumes per IOs': {
          rateCode: 'VV3ASRE8RPAY7C9U.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0000000500',
        },
        'Provisioned EBS IOPS gp3 Volumes per IOPS Mo': {
          rateCode: '7Q58NR58VQEASA4W.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0050000000',
        },
        'Provisioned EBS IOPS io1 Volumes per IOPS Mo': {
          rateCode: 'D8RDVC722HKNR55G.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0650000000',
        },
        'Provisioned EBS IOPS io2 Volumes per IOPS Mo': {
          rateCode: 'X9AGQNCQXFA9Q8XZ.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0650000000',
        },
        'Provisioned EBS IOPS Tier 2 io2 Volumes per IOPS Mo': {
          rateCode: 'KDKG2R3W4NMV7CHP.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0455000000',
        },
        'Provisioned EBS IOPS Tier 3 io2 Volumes per IOPS Mo': {
          rateCode: 'AX8G343U7JZBRKJB.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0318500000',
        },
        'Provisioned EBS I O Requests standard Volumes per IOs': {
          rateCode: 'VV3ASRE8RPAY7C9U.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0000000500',
        },
        'Get Requests for EBS direct APIs per SnapshotAPIUnits': {
          rateCode: 'QRY3U66NSBVRCCHZ.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0000030000',
        },
        'List Requests for EBS direct APIs per Requests': {
          rateCode: '9PNNGFWQP7349GGM.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0000006000',
        },
        'Put Requests for EBS direct APIs per SnapshotAPIUnits': {
          rateCode: 'TUB3X35AQ4QARUZC.JRTCKXETXF.6YS6EN2CT7',
          price: '0.0000060000',
        },
        'Fast Snapshot Restore per hours': {
          rateCode: 'JMGBAZ4CB88RKXT5.JRTCKXETXF.6YS6EN2CT7',
          price: '0.7500000000',
        },
      })
    ).toEqual(43.5);
  });
});
