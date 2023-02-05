// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

const navHeader = { text: 'OpenShift on AWS', href: '#/' };
export const navItems: SideNavigationProps['items'] = [
  {
    type: 'section',
    text: 'Pricing',
    items: [{ type: 'link', text: 'Create estimate', href: '#/distributions' }],
  },
  {
    type: 'section',
    text: 'Resources',
    items: [
      { type: 'link', text: 'User guide', href: 'https://docs.aws.amazon.com/ROSA/latest/userguide/what-is-rosa.html' },
      {
        type: 'link',
        text: 'YouTube channel',
        href: 'https://www.youtube.com/playlist?list=PLhr1KZpdzukc5X53T27sDSBK7myDVwYqj',
      },
      { type: 'link', text: 'Workshops', href: 'https://catalog.workshops.aws/aws-openshift-workshop/en-US' },
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
