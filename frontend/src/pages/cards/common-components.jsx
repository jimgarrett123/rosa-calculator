// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { BreadcrumbGroup, HelpPanel } from '@cloudscape-design/components';
import { resourcesBreadcrumbs } from '../../common/breadcrumbs';
import { ExternalLinkGroup } from '../commons';

export const Breadcrumbs = () => (
  <BreadcrumbGroup items={resourcesBreadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />
);

const toolsFooter = (
  <ExternalLinkGroup
    items={[
      {
        text: 'Amazon EC2',
        href: 'https://aws.amazon.com/ec2/instance-types/',
      },
      {
        text: 'Red Hat OpenShift Service on AWS',
        href: 'https://aws.amazon.com/rosa/',
      },
    ]}
  />
);
export const ToolsContent = () => (
  <HelpPanel footer={toolsFooter} header={<h2>Instances</h2>}>
    <p>
      Amazon EC2 provides a wide selection of instance types optimized to fit different use cases. Instance types
      comprise varying combinations of CPU, memory, storage, and networking capacity and give you the flexibility to
      choose the appropriate mix of resources for your applications. Each instance type includes one or more instance
      sizes, allowing you to scale your resources to the requirements of your target workload.
    </p>
  </HelpPanel>
);
