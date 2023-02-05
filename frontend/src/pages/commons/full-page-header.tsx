// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Header, HeaderProps, SpaceBetween } from '@cloudscape-design/components';
import { InfoLink } from './info-link';

interface FullPageHeaderProps extends HeaderProps {
  title?: string;
  createButtonText?: string;
  extraActions?: React.ReactNode;
  onInfoLinkClick?: () => void;
}

export function FullPageHeader({
  title = 'Distributions',
  extraActions = null,
  onInfoLinkClick,
  ...props
}: FullPageHeaderProps) {
  return (
    <Header
      variant="awsui-h1-sticky"
      info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} ariaLabel={`Information about ${title}.`} />}
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          {extraActions}
          {/* <Button data-testid="header-btn-view-details">Reset Instances</Button> */}
        </SpaceBetween>
      }
      {...props}
    >
      {title}
    </Header>
  );
}
