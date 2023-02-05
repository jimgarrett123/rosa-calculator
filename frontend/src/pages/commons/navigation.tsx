// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

const navHeader = { text: 'OpenShift on AWS', href: '#/' };
export const navItems: SideNavigationProps['items'] = [
  {
    type: 'section',
    text: 'Pricing',
    items: [
      { type: 'link', text: 'Create an estimate', href: '#/distributions' },
      {
        type: 'link',
        text: 'Request a quote',
        href: 'https://aws.amazon.com/rosa/pricing/',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
    ],
  },
  {
    type: 'section',
    text: 'AWS Marketplace',
    items: [
      {
        type: 'link',
        text: 'Red Hat OpenShift Service on AWS',
        href: 'https://aws.amazon.com/marketplace/pp/prodview-tnyp2h3acabm6',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
      {
        type: 'link',
        text: 'Red Hat® OpenShift® Container Platform',
        href: 'https://aws.amazon.com/marketplace/pp/prodview-2jowb6mcebdji',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
    ],
  },
  {
    type: 'section',
    text: 'Resources',
    items: [
      {
        type: 'link',
        text: 'Pricing and Cost Control',
        href: 'https://pages.awscloud.com/apn-tv-571.html',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
      {
        type: 'link',
        text: 'Annual Contracts',
        href: 'https://aws.amazon.com/blogs/containers/red-hat-openshift-service-on-aws-rosa-annual-contracts/',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
      {
        type: 'link',
        text: 'Cost Tracking on AWS',
        href: 'https://aws.amazon.com/blogs/opensource/cost-tracking-for-openshift-on-aws/',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
      {
        type: 'link',
        text: 'Guide to right-sizing',
        href: 'https://cloud.redhat.com/blog/guiding-developers-to-rightsize-their-openshift-applications',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
      {
        type: 'link',
        text: 'AWS Spot Instances',
        href: 'https://cloud.redhat.com/blog/a-guide-to-red-hat-openshift-and-aws-spot-instances',
        external: true,
        externalIconAriaLabel: 'Opens in a new tab',
      },
    ],
  },
];

const defaultOnFollowHandler: SideNavigationProps['onFollow'] = event => {
  // keep the locked href for our demo pages
  event.preventDefault();
};

interface NavigationProps {
  activeHref?: string;
  header?: SideNavigationProps['header'];
  items?: SideNavigationProps['items'];
  onFollowHandler?: SideNavigationProps['onFollow'];
}

export function Navigation({
  activeHref,
  header = navHeader,
  items = navItems,
  onFollowHandler = defaultOnFollowHandler,
}: NavigationProps) {
  return <SideNavigation items={items} header={header} activeHref={activeHref} onFollow={onFollowHandler} />;
}
