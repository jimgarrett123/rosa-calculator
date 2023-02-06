// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Flex, Link, useAuthenticator, useTheme } from '@aws-amplify/ui-react';
import React from 'react';

export function SignInFooter() {
  const { toResetPassword } = useAuthenticator();
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center" padding={`0 0 ${tokens.space.medium}`}>
      <Link onClick={toResetPassword}>Reset your password</Link>
    </Flex>
  );
}
