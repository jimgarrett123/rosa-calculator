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
        text: 'Red Hat OpenShift Service on AWS Pricing',
        href: 'https://aws.amazon.com/rosa/pricing/',
      },
    ]}
  />
);
export const ToolsContent = () => (
  <HelpPanel footer={toolsFooter} header={<h2>Red Hat OpenShift on AWS - Pricing Calculator</h2>}>
    <p>
      Use this calculator to estimate the software and infrastructure costs based on your configuration choices. Your
      usage and costs might be different from this estimate. They will be reflected on your monthly AWS billing reports.
    </p>
  </HelpPanel>
);
