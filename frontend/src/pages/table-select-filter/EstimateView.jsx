// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
import { Table } from '@cloudscape-design/components';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Alert from '@cloudscape-design/components/alert';
import { getWorkerNodes, getEstimate } from '../../lib/cost';
import Box from '@cloudscape-design/components/box';

export function EstimateView(props) {
  const { tableItems, region } = props;

  const [estimateMultiAz, setEstimateMultiAz] = useState();
  const [estimateSingleAz, setEstimateSingleAz] = useState();
  const [nodes, setNodes] = useState();
  const [ebsPrices, setEBSPrices] = useState();
  const [ec2Prices, setEC2Prices] = useState();
  const [error, setError] = useState();
  const [errorReason, setErrorReason] = useState();

  useEffect(() => {
    const nodes = [['ec2_type']];

    tableItems.forEach(element => {
      if (element.count > 0) {
        for (let i = 0; i < element.count; i++) {
          nodes.push([element.id]);
        }
      }
    });

    let workerNodes = [];

    try {
      workerNodes = getWorkerNodes(nodes, ec2Prices);
    } catch (e) {
      if (nodes.length > 0) {
        setError(e.message);
        setErrorReason('You can try to add / select other instance types');
      }
    }

    fetch(`/prices/${region}-ebs.json`)
      .then(res => res.json(), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(
        result => {
          setEBSPrices(result);

          fetch(`/prices/${region}-ec2.json`)
            .then(res => res.json(), {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            })
            .then(
              result => {
                setEC2Prices(result);

                setNodes(workerNodes);
                setEstimateMultiAz(getEstimate(workerNodes, 3, ec2Prices, ebsPrices));
                setEstimateSingleAz(getEstimate(workerNodes, 2, ec2Prices, ebsPrices));
                setError(null);
                setErrorReason(null);
              },
              error => {
                setError(error);
              }
            );
        },
        error => {
          setError(error);
        }
      );
  }, [ebsPrices, ec2Prices, region, tableItems]);

  if (error) {
    return (
      <Alert statusIconAriaLabel="Error" type="error" header={`${error} (AWS Region code: ${region})`}>
        {errorReason && errorReason}
        {!errorReason && 'Please contact your administrator.'}
      </Alert>
    );
  }

  if (!nodes || nodes.length === 0) {
    return (
      <Alert statusIconAriaLabel="Info" header={'Verify your configuration'}>
        To include you worker node sizes in the estimate,
        <ul>
          <li>select a region</li>
          <li>edit the number of instances for each Amazon EC2 instance type</li>
        </ul>
      </Alert>
    );
  }

  const display = ec2Prices && ebsPrices && estimateSingleAz && estimateMultiAz;

  let displayNodes = [];
  tableItems.forEach(element => {
    if (element.count > 0) {
      displayNodes.push(`${element.count}x ${element.id}`);
    }
  });
  return (
    display && (
      <>
        {/* {JSON.stringify(tableItems)} */}
        <p>
          <small>
            Prices based on a 1-year and 3-year commitment use Standard Reserved Instances (payment method: All
            upfront).
          </small>
        </p>
        <SpaceBetween size="l">
          {}
          <EstimateTable
            estimate={estimateMultiAz}
            header={`3x Availability Zones (worker node types: ${displayNodes.join(', ')})`}
          />
          <EstimateTable
            estimate={estimateSingleAz}
            header={`Single Availability Zone (worker node types: ${displayNodes.join(', ')})`}
          />
        </SpaceBetween>
      </>
    )
  );
}
function EstimateTable(props) {
  const { estimate, header } = props;
  return (
    <>
      <Table
        header={<h3>{header}</h3>}
        resizableColumns
        stripedRows
        columnDefinitions={[
          {
            id: 'description',
            header: 'Description',
            cell: item => item.description || '-',
            maxWidth: 200,
          },
          {
            id: 'col1',
            header: 'On-Demand Monthly',
            cell: item => <Box float="right">{item.col1 || '-'}</Box>,
          },
          {
            id: 'col2',
            header: 'On-Demand Annually',
            cell: item => <Box float="right">{item.col2 || '-'}</Box>,
          },
          {
            id: 'col3',
            header: '1-Year  - Monthly',
            cell: item => <Box float="right">{item.col3 || '-'}</Box>,
          },
          {
            id: 'col4',
            header: '1-Year  - Annually',
            cell: item => <Box float="right">{item.col4 || '-'}</Box>,
          },
          {
            id: 'col5',
            header: '3-Year  - Monthly',
            cell: item => <Box float="right">{item.col5 || '-'}</Box>,
          },
          {
            id: 'col6',
            header: '3-Year  - Annually',
            cell: item => <Box float="right">{item.col6 || '-'}</Box>,
          },
        ]}
        items={[
          {
            description: estimate.estimate.redHatClusterFees.description,
            col1: currency(estimate.estimate.redHatClusterFees.monthly),
            col2: currency(estimate.estimate.redHatClusterFees.annually),
            col3: currency(estimate.estimate.redHatClusterFees.monthly),
            col4: currency(estimate.estimate.redHatClusterFees.annually),
            col5: currency(estimate.estimate.redHatClusterFees.monthly),
            col6: currency(estimate.estimate.redHatClusterFees.annually),
          },
          {
            description: estimate.estimate.controlPlane.description,
            col1: currency(estimate.estimate.controlPlane.onDemand.monthly),
            col2: currency(estimate.estimate.controlPlane.onDemand.annually),
            col3: currency(estimate.estimate.controlPlane['1year'].monthly),
            col4: currency(estimate.estimate.controlPlane['1year'].annually),
            col5: currency(estimate.estimate.controlPlane['3year'].monthly),
            col6: currency(estimate.estimate.controlPlane['3year'].annually),
          },
          {
            description: estimate.estimate.infra.description,
            col1: currency(estimate.estimate.infra.onDemand.monthly),
            col2: currency(estimate.estimate.infra.onDemand.annually),
            col3: currency(estimate.estimate.infra['1year'].monthly),
            col4: currency(estimate.estimate.infra['1year'].annually),
            col5: currency(estimate.estimate.infra['3year'].monthly),
            col6: currency(estimate.estimate.infra['3year'].annually),
          },
          {
            description: estimate.estimate.workers.description,
            col1: currency(estimate.estimate.workers.onDemand.monthly),
            col2: currency(estimate.estimate.workers.onDemand.annually),
            col3: currency(estimate.estimate.workers['1year'].monthly),
            col4: currency(estimate.estimate.workers['1year'].annually),
            col5: currency(estimate.estimate.workers['3year'].monthly),
            col6: currency(estimate.estimate.workers['3year'].annually),
          },

          {
            description: estimate.estimate.redHatDataplaneFees.description,
            col1: currency(estimate.estimate.redHatDataplaneFees.onDemand.monthly),
            col2: currency(estimate.estimate.redHatDataplaneFees.onDemand.annually),
            col3: currency(estimate.estimate.redHatDataplaneFees['1year'].monthly),
            col4: currency(estimate.estimate.redHatDataplaneFees['1year'].annually),
            col5: currency(estimate.estimate.redHatDataplaneFees['3year'].monthly),
            col6: currency(estimate.estimate.redHatDataplaneFees['3year'].annually),
          },
          {
            description: estimate.estimate.storageWorkers.description,
            col1: currency(estimate.estimate.storageWorkers.monthly),
            col2: currency(estimate.estimate.storageWorkers.annually),
            col3: currency(estimate.estimate.storageWorkers.monthly),
            col4: currency(estimate.estimate.storageWorkers.annually),
            col5: currency(estimate.estimate.storageWorkers.monthly),
            col6: currency(estimate.estimate.storageWorkers.annually),
          },
          {
            description: estimate.estimate.storageInfra.description,
            col1: currency(estimate.estimate.storageInfra.monthly),
            col2: currency(estimate.estimate.storageInfra.annually),
            col3: currency(estimate.estimate.storageInfra.monthly),
            col4: currency(estimate.estimate.storageInfra.annually),
            col5: currency(estimate.estimate.storageInfra.monthly),
            col6: currency(estimate.estimate.storageInfra.annually),
          },
          {
            description: estimate.estimate.storageControlPlane.description,
            col1: currency(estimate.estimate.storageControlPlane.monthly),
            col2: currency(estimate.estimate.storageControlPlane.annually),
            col3: currency(estimate.estimate.storageControlPlane.monthly),
            col4: currency(estimate.estimate.storageControlPlane.annually),
            col5: currency(estimate.estimate.storageControlPlane.monthly),
            col6: currency(estimate.estimate.storageControlPlane.annually),
          },
          {
            description: <strong>Total USD</strong>,
            col1: <strong>{currency(estimate.estimateTotal.onDemand.monthly)}</strong>,
            col2: <strong>{currency(estimate.estimateTotal.onDemand.annual)}</strong>,
            col3: <strong>{currency(estimate.estimateTotal.oneYear.monthly)}</strong>,
            col4: <strong>{currency(estimate.estimateTotal.oneYear.annually)}</strong>,
            col5: <strong>{currency(estimate.estimateTotal.threeYear.monthly)}</strong>,
            col6: <strong>{currency(estimate.estimateTotal.threeYear.annually)}</strong>,
          },
        ]}
        loadingText="Loading resources"
        sortingDisabled
        variant="embedded"
      />
    </>
  );
}
function currency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.round(amount));
}
