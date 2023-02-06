// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Flex, Text, useTheme } from '@aws-amplify/ui-react';
import React from 'react';

export function Footer() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center" padding={tokens.space.medium}>
      <Text>&copy; Amazon.com, Inc. or its affiliates. All Rights Reserved.</Text>
    </Flex>
  );
}
