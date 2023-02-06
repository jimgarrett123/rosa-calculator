// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Flex, Image, useTheme } from '@aws-amplify/ui-react';
import React from 'react';

export function Header() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center">
      <Image alt="logo" src="https://docs.amplify.aws/assets/logo-dark.svg" padding={tokens.space.medium} />
    </Flex>
  );
}
